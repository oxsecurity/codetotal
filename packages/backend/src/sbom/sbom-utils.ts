import axios from "axios";
import axiosRetry from 'axios-retry';
import { SbomPackage, Severity } from "shared-types";
import licenseConfig from "./licenseConfig.json";
import {
  Component,
  Dependency,
  LicenseInfo,
  NpmLicense,
  PackageRequestData,
} from "./sbom-types";

function sortByLicenseLength(arr: LicenseInfo[]): LicenseInfo[] {
  return arr.sort((a, b) => b.license.length - a.license.length);
}

export const fetchPackages = async (
  dependencies: Dependency[],
  components: Component[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any[]> => {
  // filter out deps without "dependsOn"
  const withDependsOn = dependencies.filter((dep) => !!dep.dependsOn);

  // map all dependsOn values and flat the matrix
  const flatDeps = withDependsOn.map((dep) => dep.dependsOn).flat();

  // filter out deps without "component"
  const withComponent = flatDeps.filter((purl) =>
    components.some((component) => component.purl === purl)
  );

  // List npm packages
  const npmPackages = withComponent
    .filter((purl) => isNpmPackage(purl))
    .map((purl) => resolvePackageRequestData(purl, components))
    .filter((pkg) => !!pkg);
  // Remove duplicate package & version
  const npmPackagesUnique = npmPackages.reduce((unique, o) => {
    if (!unique.some(obj => obj.name === o.name && obj.version === o.version)) {
      unique.push(o);
    }
    return unique;
  }, []);
  // Fetch packages infos (in parallel promises)
  const npmPackagesPromises = npmPackagesUnique.map(fetchDataFromNPM);

  const pyPackages = withComponent
    .filter((purl) => isPythonPackage(purl))
    .map((purl) => resolvePackageRequestData(purl, components))
    .filter((pkg) => !!pkg)
    .map(fetchDataFromPyPi);

  const allPackagesPromises = [...npmPackagesPromises, ...pyPackages];
  const allPackages = await Promise.all(allPackagesPromises);
  console.log("Fetched dependent packages info");
  // console.log(allPackages);
  return allPackages;
};

const isPythonPackage = (purl: string) => purl.startsWith("pkg:pypi");
const isNpmPackage = (purl: string) => purl.startsWith("pkg:npm");

const resolvePackageRequestData = (
  purl: string,
  components: Component[]
): PackageRequestData | undefined => {
  const component = components.find((component) => component.purl === purl);
  if (component) {
    return {
      name: component.name,
      version: component.version,
    };
  }
  return undefined;
};

export async function getPackages(
  dependencies: Dependency[],
  components: Component[],
  applications: Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pkgsInfo: any[]
) {
  const sbomPackages: SbomPackage[] = [];
  const sortedLicenseConfig = sortByLicenseLength(licenseConfig);
  let filePath = "";

  for (const dependency of dependencies) {
    // if (applications.hasOwnProperty(dependency.ref)) {
    if (Object.prototype.hasOwnProperty.call(applications, dependency.ref)) {
      filePath = applications[dependency.ref];
    } else {
      console.log(`no application for ref: ${dependency.ref}`);
    }
    if (dependency.dependsOn) {
      for (const purl of dependency.dependsOn) {
        console.log(`working on purl ${purl}`);
        const component = components.find(
          (component) => component.purl === purl
        );
        let registry = "";
        let license = "Unknown";
        let severity = Severity.Medium;
        if (component) {
          const sourceList: string[] = [];

          if (isPythonPackage(purl)) {
            registry = "PyPi";
            try {
              const packageInfo = pkgsInfo.find(
                (pkg) => pkg &&
                  pkg.name === component.name &&
                  pkg.version === component.version
              );
              if (packageInfo?.info?.license) {
                sourceList.push(packageInfo.info.license);
              }
              if (packageInfo?.info?.classifiers) {
                sourceList.push(packageInfo.info.classifiers.join(" "));
              }
            } catch (error) {
              console.error("Error:", error);
            }
          } else if (isNpmPackage(purl)) {
            try {
              const packageInfo = pkgsInfo.find(
                (pkg) => pkg &&
                  pkg.name === component.name &&
                  pkg.version === component.version
              );
              if (packageInfo?.license) {
                sourceList.push(packageInfo.license);
              } else if (packageInfo?.licenses) {
                packageInfo.licenses.forEach((npmLicense: NpmLicense) => {
                  if (npmLicense.type) {
                    sourceList.push(npmLicense.type);
                  }
                });
              } else {
                console.log(`missing license for: ${purl}`);
              }
            } catch (error) {
              console.error("Error:", error);
            }
          } else {
            console.log(`purl: ${purl}`);
          }

          if (sourceList.length == 0) {
            console.log(`no where to get license for ${purl}`);
          } else {
            for (const licenseSoruce of sourceList) {
              const licenseItem = sortedLicenseConfig.find((item) =>
                licenseSoruce.includes(item.license)
              );
              if (licenseItem) {
                license = licenseItem.license;
                severity = Severity[licenseItem.severity];
                break;
              }
            }
          }

          sbomPackages.push({
            packageName: component.name,
            packageVersion: component.version,
            license: license,
            registry: registry,
            severity: severity,
            filePath: filePath,
          });
        } else {
          console.log(`missing component info, purl: ${purl}`);
        }
      }
    } else {
      console.log(`no depends for ref: ${dependency.ref}`);
    }
  }

  // Remove duplicates
  const sbomPackagesUnique = sbomPackages.reduce((unique, o) => {
    if (!unique.some(obj => obj.packageName === o.packageName && obj.packageVersion === o.packageVersion)) {
      unique.push(o);
    }
    return unique;
  }, []);

  // Order SBOM packages
  const severityOrder = ["critical", "high", "medium", "low"];
  sbomPackagesUnique.sort(
    (a, b) => {
      // First, order by severity
      const orderRes = severityOrder.indexOf(b.severity) - severityOrder.indexOf(a.severity);
      if ([1, -1].includes(orderRes)) {
        return orderRes;
      }
      // Then order by package name
      const packageNameRes = a.packageName.localeCompare(b.packageName);
      if ([1, -1].includes(packageNameRes)) {
        return orderRes;
      }
      // Otherwise use version number
      return a.packageVersion.localeCompare(b.packageVersion);
    }
  );
  return sbomPackagesUnique;
}

async function fetchDataFromPyPi({
  name,
  version,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PackageRequestData): Promise<any> {
  axiosRetry(axios, { retries: 15, retryDelay: axiosRetry.exponentialDelay });
  try {
    const url = `https://pypi.org/pypi/${name}/${version}/json`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from PyPi:", error);
  }
}

async function fetchDataFromNPM({
  name,
  version,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PackageRequestData): Promise<any> {
  axiosRetry(axios, { retries: 15, retryDelay: axiosRetry.exponentialDelay });
  try {
    const url = `https://registry.npmjs.org/${name}/${version}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from NPM:", error);
  }
}

export function extractMappingForApplication(
  components: Component[]
): Record<string, string> {
  const mapping: Record<string, string> = {};

  for (const component of components) {
    if (component.type === "application") {
      mapping[component["bom-ref"]] = component.name;
    }
  }

  return mapping;
}
