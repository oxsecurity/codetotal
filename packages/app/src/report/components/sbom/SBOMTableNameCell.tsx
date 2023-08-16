import { FC } from "react";
import { SbomPackage } from "shared-types";
import { makeStyles } from "tss-react/mui";
import { resolveRegistryUrl } from "../../utils/registry-utils";

export const SBOMTableNameCell: FC<SBOMTableNameCellProps> = ({ pkg }) => {
  const { classes } = useStyles();
  const registryUrl = resolveRegistryUrl(pkg);

  if (!registryUrl) {
    return pkg.packageName;
  }

  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={registryUrl}
      className={classes.invertedLink}
    >
      {pkg.packageName}
    </a>
  );
};

const useStyles = makeStyles()(() => ({
  invertedLink: {
    color: "inherit",
  },
}));

interface SBOMTableNameCellProps {
  pkg: SbomPackage;
}
