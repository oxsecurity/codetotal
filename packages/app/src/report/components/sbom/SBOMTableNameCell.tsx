import { SbomPackage } from "@ct/shared-types";
import { Tooltip } from "@mui/material";
import { FC } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { makeStyles } from "tss-react/mui";
import { resolveRegistryUrl } from "../../utils/registry-utils";

export const SBOMTableNameCell: FC<SBOMTableNameCellProps> = ({ pkg }) => {
  const { classes } = useStyles();
  const registryUrl = resolveRegistryUrl(pkg);

  if (!registryUrl) {
    return (
      <span className={classes.missingRegistry}>
        <span>{pkg.packageName}</span>
        <Tooltip
          arrow
          placement="top"
          title="Not found in the registry, could be an internal package"
        >
          <span style={{ display: "flex" }}>
            <AiFillInfoCircle />
          </span>
        </Tooltip>
      </span>
    );
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

const useStyles = makeStyles()((theme) => ({
  invertedLink: {
    color: "inherit",
  },
  missingRegistry: {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
}));

interface SBOMTableNameCellProps {
  pkg: SbomPackage;
}
