import PromisePool from "@supercharge/promise-pool";
import axios from "axios";
import axiosRetry from "axios-retry";
import { logger } from "../utils/logger";
import { Component, Dependency, PackageRequestData } from "./sbom-types";
import config from "../config";

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

  // Build packages to fetch
  const packagesToFetch = withComponent
    .map((purl) => resolvePackageRequestData(purl, components))
    .filter((pkg) => !!pkg);

  // Make package list unique
  const packagesToFetchUnique = packagesToFetch.reduce((unique, o) => {
    if (!unique.some(obj => obj.name === o.name && obj.version === o.version)) {
      unique.push(o);
    }
    return unique;
  }, []);

  // Fetch packages infos using PromisePool: default concurrency is 10 requests in parallel
  logger.sbom.log(`Fetching ${packagesToFetchUnique.length} packages...`);
  const start = performance.now();
  const { results } = await PromisePool
    .withConcurrency(Number(config.CODETOTAL_SBOM_FETCH_PARALLEL_NB))
    .for(packagesToFetchUnique)
    .process(
      async (pkg) => {
        if (isNpmPackage(pkg.purl || '')) {
          return await fetchDataFromNPM(pkg);
        }
        else if (isPythonPackage(pkg.purl || '')) {
          return await fetchDataFromPyPi(pkg);
        }
        return pkg;
      }
    );
  const elapsedMs = performance.now() - start;

  const resultsClean = results.filter(pkg => pkg !== null);
  logger.sbom.log(`Fetched ${resultsClean.length} packages successfully in ${elapsedMs} ms`);
  return resultsClean;
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
      purl: purl
    };
  }
  return undefined;
};

// Fetch data from PyPi packages registry
async function fetchDataFromPyPi({
  name,
  version,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PackageRequestData): Promise<any> {
  axiosRetry(axios, { retries: 15, retryDelay: axiosRetry.exponentialDelay });
  try {
    const url = `https://pypi.org/pypi/${name}/${version}/json`;
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
    logger.sbom.error(`Error fetching data from PyPi for ${name}:${version} : ${response.status}`);
    return null;
  } catch (error) {
    logger.sbom.error(`Error fetching data from PyPi for ${name}:${version} : ${error.message}`);
    return null;
  }
}

// Fetch data from NPM packages registry
async function fetchDataFromNPM({
  name,
  version,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PackageRequestData): Promise<any> {
  axiosRetry(axios, { retries: 15, retryDelay: axiosRetry.exponentialDelay });
  try {
    const url = `https://registry.npmjs.org/${name}/${version}`;
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
    logger.sbom.error(`Error fetching data from NPM for ${name}:${version} : ${response.status}`);
    return null;
  } catch (error) {
    logger.sbom.error(`Error fetching data from NPM for ${name}:${version} : ${error.message}`);
    return null;
  }
}
