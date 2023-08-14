import { Divider, Theme } from "@mui/material";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";
import { BackButton } from "./BackButton";
import { DownloadAllIssuesButton } from "./DownloadAllIssuesButton";
import { NewAnalysisButton } from "./NewAnalysisButton";
import { ShowCodeButton } from "./ShowCodeButton";

export const ReportToolbar: FC = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.reportToolbar}>
      <div className={classes.startContainer}>
        <BackButton />
        <Divider
          orientation="vertical"
          component="span"
          sx={{ marginInline: 1 }}
          flexItem
        />
        <NewAnalysisButton />
      </div>
      <div className={classes.actionsContainer}>
        <ShowCodeButton />
        <DownloadAllIssuesButton />
      </div>
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
  startContainer: {
    display: "flex",
    alignItems: "center",
  },
  actionsContainer: {
    display: "flex",
    gap: theme.spacing(1),
    alignItems: "center",
  },
}));
