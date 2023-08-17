import { Issue } from "@ct/shared-types";
import { FC, useMemo } from "react";
import { ResponsiveTable, TableOptions } from "../../../common/ResponsiveTable";
import { SeverityBadge } from "../../../common/SeverityBadge";

export const IssuesTable: FC<IssuesTableProps> = ({ linterName, issues }) => {
  const tableOptions = useMemo<TableOptions<Issue>>(
    () => ({
      emptyMessage: `No issues found for ${linterName}`,
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
    [linterName]
  );

  return <ResponsiveTable options={tableOptions} data={issues} />;
};

interface IssuesTableProps {
  linterName: string;
  issues: Issue[];
}
