import { SbomPackage } from "@ct/shared-types";
import { FC } from "react";
import { ResponsiveTable, TableOptions } from "../../../common/ResponsiveTable";
import { SeverityBadge } from "../../../common/SeverityBadge";
import { useReportStore } from "../../stores/fe-report-store";
import { SBOMTableNameCell } from "./SBOMTableNameCell";

export const SBOMTable: FC = () => {
  const { packages } = useReportStore();
  return <ResponsiveTable options={tableOptions} data={packages} />;
};

const tableOptions: TableOptions<SbomPackage> = {
  emptyMessage: "No packages information found",
  cells: [
    {
      label: "Name",
      cellRenderer: (row) => <SBOMTableNameCell pkg={row} />,
    },
    { label: "Version", key: "packageVersion" },
    {
      label: "Severity",
      cellRenderer: (row) => <SeverityBadge severity={row.severity} />,
    },
    { label: "License", key: "license" },
    {
      label: "Registry",
      cellRenderer: (row) => row.registry || "Unknown",
    },
    { label: "File Path", key: "filePath" },
  ],
};
