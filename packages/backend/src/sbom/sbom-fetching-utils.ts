import PromisePool from "@supercharge/promise-pool";
import axios from "axios";
import axiosRetry from "axios-retry";
import { logger } from "../utils/logger";
import { Component, Dependency, PackageRequestData } from "./sbom-types";

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

  const npmPackages = withComponent
    .filter((purl) => isNpmPackage(purl))
    .map((purl) => resolvePackageRequestData(purl, components))
    .filter((pkg) => !!pkg)
    .map(fetchDataFromNPM);

  const pyPackages = withComponent
    .filter((purl) => isPythonPackage(purl))
    .map((purl) => resolvePackageRequestData(purl, components))
    .filter((pkg) => !!pkg)
    .map(fetchDataFromPyPi);

  const allPackagesPromises = [...npmPackages, ...pyPackages];
  if (allPackagesPromises.length === 0) {
    // no need to fetch anything
    return [];
  }

  logger.sbom.log(`Fetching ${allPackagesPromises.length} packages...`);

  // default concurrency is 10
  const { results } = await PromisePool.for(allPackagesPromises).process(
    async (pkgPromise) => {
      const pkg = await pkgPromise;
      return pkg;
    }
  );

  logger.sbom.log(`Fetching packages completed`);
  return results;
};

export const isPythonPackage = (purl: string) => purl.startsWith("pkg:pypi");
export const isNpmPackage = (purl: string) => purl.startsWith("pkg:npm");

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
