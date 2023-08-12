import {
  Divider,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";
import { LanguageIcon } from "../../../languages/components/LanguageIcon";
import { useReportStore } from "../../stores/fe-report-store";
import { ReportHeaderSection } from "./ReportHeaderSection";
import { ReportToolbar } from "./ReportToolbar";
import { Score } from "./Score";

export const ReportHeader: FC<ReportBannerProps> = ({ ready }) => {
  const { classes } = useStyles();
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const {
    score,
    scoreColor,
    resourceType,
    resourceValue,
    linters = [],
    lintersWithIssues,
    progress,
    language,
  } = useReportStore();

  if (!lintersWithIssues) {
    return null;
  }
  const lintersWithIssuesCount = lintersWithIssues();
  const scoreColorKey = scoreColor();
  const color = theme.palette[scoreColorKey].main || theme.palette.divider;

  return (
    <Paper
      square
      style={{ borderColor: color }}
      className={classes.reportBanner}
    >
      <div className={classes.textContainer}>
        <Typography
          variant="h1"
          className={classes.title}
          style={{ color }}
          data-cy="report-header"
        >
          {linters.length === 0 && (
            <>
              Scanning
              <span className={classes.resourceTypeText}>
                &nbsp;{resourceType}&nbsp;
              </span>
              ...
            </>
          )}
          {linters.length > 0 && (
            <>
              {lintersWithIssuesCount} / {linters.length} security linters
              flagged this
              <span className={classes.resourceTypeText}>
                &nbsp;{resourceType}&nbsp;
              </span>
              to have security issues
            </>
          )}
        </Typography>
        <div className={classes.statsContainer}>
          <ReportHeaderSection
            label="Progress"
            value={`${progress()}%`}
            valueClassName={classes.nowrap}
            dataCy="progress"
          />
          <ReportHeaderSection
            label="Resource"
            value={resourceValue || "-"}
            dataCy="resource-value"
            valueClassName={classes.resourceValue}
          />
          <ReportHeaderSection
            label="Language"
            value={<LanguageIcon language={language} withLabel />}
            dataCy="language"
          />
        </div>
        <Divider orientation="horizontal" sx={{ marginBlockStart: 0.5 }} />
        <ReportToolbar />
      </div>
      <Score
        className={classes.score}
        value={score}
        ready={ready}
        color={color}
        size={isMobile ? 80 : 120}
      />
    </Paper>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  reportBanner: {
    columnGap: theme.spacing(4),
    gridTemplateColumns: "1fr auto",
    borderTop: "solid 6px",
    minHeight: 170,
    padding: theme.spacing(1, 2),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    gap: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  textContainer: {
    flexGrow: 1,
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  },
  title: {
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: 700,
    [theme.breakpoints.up("md")]: {
      fontSize: "1.562rem",
      marginBlockStart: theme.spacing(2),
      textAlign: "start",
    },
  },
  statsContainer: {
    paddingBlockStart: theme.spacing(2),
    paddingBlockEnd: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
    maxWidth: 600,
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      alignItems: "flex-end",
    },
  },
  score: {
    height: 80,
    width: 80,
    [theme.breakpoints.up("md")]: {
      height: 120,
      width: 120,
    },
  },
  nowrap: {
    wordBreak: "keep-all",
  },
  resourceValue: {
    maxWidth: 600,
    whiteSpace: "nowrap",
  },
  resourceTypeText: {
    fontWeight: 300,
  },
}));

interface ReportBannerProps {
  ready: boolean;
}
