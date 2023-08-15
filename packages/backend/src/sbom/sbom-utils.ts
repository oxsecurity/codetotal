import { SbomPackage, Severity } from "shared-types";
import { logger } from "../utils/logger";
import licenseConfig from "./licenseConfig.json";
import { isNpmPackage, isPythonPackage } from "./sbom-fetching-utils";
import { Component, Dependency, LicenseInfo, NpmLicense } from "./sbom-types";

function sortByLicenseLength(arr: LicenseInfo[]): LicenseInfo[] {
  return arr.sort((a, b) => b.license.length - a.license.length);
}

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
      logger.sbom.log(`no application for ref: ${dependency.ref}`);
    }
    if (dependency.dependsOn) {
      for (const purl of dependency.dependsOn) {
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
              logger.sbom.error("Error:", error.message);
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
                logger.sbom.log(`missing license for: ${purl}`);
              }
            } catch (error) {
              logger.sbom.error(error);
            }
          } else {
            logger.sbom.log(`purl: ${purl}`);
          }

          if (sourceList.length == 0) {
            logger.sbom.log(`no where to get license for ${purl}`);
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
          logger.sbom.log(`missing component info, purl: ${purl}`);
        }
      }
    } else {
      logger.sbom.log(`no depends for ref: ${dependency.ref}`);
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
