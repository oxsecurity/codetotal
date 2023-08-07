import { SbomPackage, Severity } from "shared-types";
import { ReportStore } from "../../stores/be-report-store";
import { LinterCompleteMessage } from "../megalinter-types";
import axios from "axios";
import licenseConfig from "../../sbom/licenseConfig.json";
// import packagesMock from "../mocks/sbom-packages.json";

export const parseSBOM = async (msg: LinterCompleteMessage, reportStore: ReportStore) => {
  const { packages } = reportStore.get();
  if (!packages) {
    if (msg?.outputSarif?.runs
      && msg?.outputSarif?.runs.length > 0 
      && msg.outputSarif.runs[0]?.properties?.megalinter?.sbom) {
        console.log('parsing sbom...')
      
        const components = msg.outputSarif.runs[0].properties.megalinter.sbom.components as Component[];
        const dependencies = msg.outputSarif.runs[0].properties.megalinter.sbom.dependencies as Dependency[];
        const applications = extractMappingForApplication(components);
        const sbomPackages: SbomPackage[] = await getPackages(dependencies, components, applications);
        if (sbomPackages && sbomPackages.length > 0) {
          reportStore.set({ packages: sbomPackages });
        }
      }
    }
};

interface Component {
  "bom-ref": string;
  type: string;
  name?: string;
  version?: string;
  properties?: any[];
  purl?: string;
}

interface Dependency {
  ref: string;
  dependsOn?: string[];
}

interface LicenseInfo {
  license: string;
  severity: string;
}

function sortByLicenseLength(arr: LicenseInfo[]): LicenseInfo[] {
  return arr.sort((a, b) => b.license.length - a.license.length);
}

async function getPackages(dependencies: Dependency[], components: Component[], applications: any) {
  const sbomPackages: SbomPackage[] = [];
  const sortedLicenseConfig = sortByLicenseLength(licenseConfig); 
  let filePath = ""

  for (const dependency of dependencies) {  
    if (applications.hasOwnProperty(dependency.ref)) {
      filePath = applications[dependency.ref] 
    } else {
      console.log(`no application for ref: ${dependency.ref}`);
    }
    if (dependency.dependsOn) {
      for(const purl of dependency.dependsOn) { 
        console.log(`working on purl ${purl}`);
        const component = components.find((component) => component.purl === purl);
        let registry = "";
        let license = "Unknown";
        let severity = Severity.Medium;
        if (component) {
          const packageName = component.name;
          const packageVersion = component.version;
          if (purl.startsWith("pkg:pypi")) {
            registry = "PyPi";
            try {
              const packageInfo = await fetchDataFromPyPi(packageName, packageVersion);
              console.log('Package Info fetched successfully for:', packageName);
  
              const sourceList: string[]= [];
              if (packageInfo?.info?.license) {
                sourceList.push(packageInfo.info.license);
              }
              if (packageInfo.info.classifiers) {
                sourceList.push(packageInfo?.info.classifiers.join(' '));
              }
              
              if (sourceList.length == 0) {
                console.log(`no where to get license for ${packageName}`);
              } else {
                for (const licenseSoruce of sourceList) {
                  const licenseItem = sortedLicenseConfig.find(item => licenseSoruce.includes(item.license));
                  if (licenseItem) {
                    license = licenseItem.license;
                    severity = Severity[licenseItem.severity];
                    break;
                  }
                } 
              }
              
            } catch (error) {
              console.error('Error:', error);
            }
          } else {
            console.log(`purl: ${purl}`);
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

  const severityOrder = ["critical", "high", "medium", "low"];
  sbomPackages.sort(
    (a, b) =>
      severityOrder.indexOf(b.severity) - severityOrder.indexOf(a.severity)
  );
  return sbomPackages;
}

async function fetchDataFromPyPi(name: string, version: string): Promise<any> {
  try {
    const url = `https://pypi.org/pypi/${name}/${version}/json`
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

function extractMappingForApplication(components: Component[]): { [key: string]: string } {
  const mapping: { [key: string]: string } = {};

  for (const component of components) {
    if (component.type === "application") {
      mapping[component["bom-ref"]] = component.name;
    }
  }

  return mapping;
}
