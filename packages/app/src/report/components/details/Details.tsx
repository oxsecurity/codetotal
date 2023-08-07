import { Paper, Theme, Typography } from "@mui/material";
import { FC } from "react";
import { AnalysisStatus, AnalysisType } from "shared-types";
import { makeStyles } from "tss-react/mui";
import { Loader } from "../../../common/Loader";
import { useReportStore } from "../../stores/fe-report-store";
import { FileInfo } from "./FileInfo";
import { RepoInfo } from "./RepoInfo";

export const Details: FC = () => {
  const { classes } = useStyles();
  const { repoDetails, fileDetails, resourceType } = useReportStore();
  const { status } = useReportStore();
  const loading =
    status === AnalysisStatus.Created && !fileDetails && !repoDetails;

  const emptyMessage = (
    <Typography variant="body2" color="text.secondary">
      No details found
    </Typography>
  );

  // DevSkim: ignore DS126858
  return (
    <Paper className={classes.reportDetails} elevation={1}>
      {resourceType === AnalysisType.File && (
        <>
          {fileDetails ? <FileInfo fileDetails={fileDetails} /> : emptyMessage}
          {loading && <Loader text={`Waiting for ${resourceType} info...`} />}
        </>
      )}
      {resourceType === AnalysisType.Repo && (
        <>
          {repoDetails ? <RepoInfo repoDetails={repoDetails} /> : emptyMessage}
          {loading && <Loader text={`Waiting for ${resourceType} info...`} />}
        </>
      )}
      {resourceType === AnalysisType.Snippet && (
        <Typography variant="body1" color="text.secondary">
          Details panel isn't applicable in case of a{" "}
          <strong>Code Snippet</strong> scan
        </Typography>
      )}
    </Paper>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  reportDetails: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    position: "relative",
    wordBreak: "break-word",
  },
}));
