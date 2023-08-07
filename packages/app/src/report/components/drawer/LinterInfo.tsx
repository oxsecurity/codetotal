import { Paper, Theme, Typography } from "@mui/material";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";
import { SeverityBadge } from "../../../common/SeverityBadge";
import { useReportStore } from "../../stores/fe-report-store";
import { IssuesTable } from "./IssuesTable";

export const LinterInfo: FC = () => {
  const { classes } = useStyles();
  const { selectedLinterName, linters = [] } = useReportStore();

  const selectedLinter = linters.find(
    (linter) => linter.name === selectedLinterName
  );

  if (!selectedLinterName) {
    return null;
  }

  return (
    <div>
      {selectedLinter && (
        <div className={classes.header}>
          <Typography variant="body1" color="text.primary" fontWeight="bold">
            {selectedLinter?.name}&nbsp; (
            <a
              className={classes.link}
              target="_blank"
              rel="noreferrer"
              href={selectedLinter.docUrl.replace("/alpha/", "/beta/")}
            >
              docs
            </a>
            )
          </Typography>
          {selectedLinter.severity && (
            <SeverityBadge severity={selectedLinter.severity} />
          )}
        </div>
      )}
      <Paper>
        <IssuesTable
          linterName={selectedLinterName}
          issues={selectedLinter?.issues || []}
        />
      </Paper>
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  header: {
    paddingBlockEnd: theme.spacing(2),
    marginBlockEnd: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  link: {
    color: theme.palette.primary.main,
    fontWeight: 400,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
