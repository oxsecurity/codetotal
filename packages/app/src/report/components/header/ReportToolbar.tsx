import { Button, Divider, Theme } from "@mui/material";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";
import { useReportStore } from "../../stores/fe-report-store";
import { BackButton } from "./BackButton";
import { DownloadAllIssuesButton } from "./DownloadAllIssuesButton";

export const ReportToolbar: FC = () => {
  const { classes } = useStyles();
  const { openNewAnalysisDialog } = useReportStore();

  return (
    <div className={classes.reportToolbar}>
      <span>
        <BackButton />
        <Divider
          orientation="vertical"
          component="span"
          sx={{ marginInline: 1 }}
        />
        <Button
          style={{ textTransform: "none" }}
          onClick={openNewAnalysisDialog}
        >
          New Analysis
        </Button>
      </span>
      <DownloadAllIssuesButton />
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  reportToolbar: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    paddingBlockStart: theme.spacing(1),
    justifyContent: "space-between",
  },
}));
