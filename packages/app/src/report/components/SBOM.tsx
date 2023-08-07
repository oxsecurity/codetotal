import { Paper } from "@mui/material";
import { FC } from "react";
import { AnalysisStatus } from "shared-types";
import { useReportStore } from "../stores/fe-report-store";
import { Loader } from "./Loader";
import { SBOMTable } from "./SBOMTable";

export const SBOM: FC = () => {
  const { packages, status } = useReportStore();
  const loading = status === AnalysisStatus.Created && packages.length === 0;

  return (
    <Paper>
      {loading ? (
        <Loader text="Waiting for SBOM information..." />
      ) : (
        <SBOMTable />
      )}
    </Paper>
  );
};
