import { Registry, SbomPackage } from "@ct/shared-types";

export const resolveRegistryUrl = ({
  packageName,
  packageVersion,
  registry,
}: SbomPackage) => {
  switch (registry) {
    case Registry.Npm:
      return `https://www.npmjs.com/package/${packageName}/v/${packageVersion}`;
    case Registry.Pypi:
      return `https://pypi.org/project/${packageName}/${packageVersion}`;
  }

  return undefined;
};
