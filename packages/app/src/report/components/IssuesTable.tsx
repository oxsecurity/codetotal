import { Theme, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { Issue } from "shared-types";
import { makeStyles } from "tss-react/mui";
import { useReportStore } from "../stores/fe-report-store";
import { ResponsiveTable, TableOptions } from "./ResponsiveTable";
import { SeverityBadge } from "./SeverityBadge";

export const IssuesTable: FC = () => {
  const { classes } = useStyles();
  const { selectedLinterName, linters = [] } = useReportStore();

  const selectedLinter = linters.find(
    (linter) => linter.name === selectedLinterName
  );

  const tableOptions = useMemo<TableOptions<Issue>>(
    () => ({
      emptyMessage: `No issues found for ${selectedLinter?.name}`,
      cells: [
        { label: "Rule", key: "ruleId" },
        { label: "Title", key: "title" },
        {
          label: "Severity",
          cellRenderer: (row) => <SeverityBadge severity={row.severity} />,
        },
        { label: "Location", key: "location" },
        {
          label: "Line #",
          key: "lineNumber",
          headerCellStyle: { whiteSpace: "nowrap" },
        },
      ],
    }),
    [selectedLinter?.name]
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
      <ResponsiveTable
        options={tableOptions}
        data={selectedLinter?.issues || []}
      />
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
