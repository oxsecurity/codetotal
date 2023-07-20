import { Theme, Typography } from "@mui/material";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";
import { useReportStore } from "../stores/fe-report-store";
import { SeverityBadge } from "./SeverityBadge";

export const SarifInfo: FC = () => {
  const { classes } = useStyles();
  const { selectedLinterName, linters = [] } = useReportStore();
  const selectedLinter = linters.find(
    (linter) => linter.name === selectedLinterName
  );

  if (!selectedLinter) {
    return null;
  }

  return (
    <div className={classes.sarifInfo}>
      <Typography variant="body1" color="text.primary" fontWeight="bold">
        {selectedLinterName}
      </Typography>
      {selectedLinter.severity && (
        <SeverityBadge severity={selectedLinter.severity} />
      )}
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  sarifInfo: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));
