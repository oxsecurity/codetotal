import { CircularProgress, Theme, Typography } from "@mui/material";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";
import { Linter } from "../fe-report-types";
import { SeverityBadge } from "./SeverityBadge";

export const LinterStatus: FC<LinterStatusProps> = ({ status, severity }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.linterStatus}>
      {status === "started" ? (
        <>
          <CircularProgress size="1em" />
          <Typography variant="caption">Scanning</Typography>
        </>
      ) : (
        <>
          {severity ? (
            <SeverityBadge severity={severity} />
          ) : (
            <SeverityBadge severity="clean" />
          )}
        </>
      )}
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  linterStatus: {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(1),
    minWidth: 80,
  },
}));

interface LinterStatusProps {
  status: Linter["status"];
  severity?: Linter["severity"];
}
