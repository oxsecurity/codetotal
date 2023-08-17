import { AnalysisStatus } from "@ct/shared-types";
import { Paper } from "@mui/material";
import { FC } from "react";
import { Loader } from "../../../common/Loader";
import { useReportStore } from "../../stores/fe-report-store";
import { SBOMTable } from "./SBOMTable";

export const SBOM: FC = () => {
  const { packages, status } = useReportStore();
  const loading = status === AnalysisStatus.Created && packages.length === 0;

  return (
    <Paper>
      {loading ? <Loader text="Waiting for SBOM info" /> : <SBOMTable />}
    </Paper>
  );
};
