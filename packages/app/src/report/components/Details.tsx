import { Paper, Theme, Typography } from "@mui/material";
import { filesize } from "filesize";
import { FC } from "react";
import { AnalysisType } from "shared-types";
import { makeStyles } from "tss-react/mui";
import { useReportStore } from "../stores/fe-report-store";

export const Details: FC = () => {
  const { classes } = useStyles();
  const { repoDetails, fileDetails, resourceType } = useReportStore();

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
          {!fileDetails && emptyMessage}
          {fileDetails && (
            <>
              <DetailsItem label="Language" value={fileDetails.language} />
              <DetailsItem
                label="File Size"
                value={filesize(fileDetails.fileSize).toString()}
              />
              <DetailsItem label="MD5" value={fileDetails.md5} /> 
              <DetailsItem label="ssdeep" value={fileDetails.ssdeep} />
              <DetailsItem label="Encoding" value={fileDetails.encoding} />
            </>
          )}
        </>
      )}
      {resourceType === AnalysisType.Repo && (
        <>
          {!repoDetails && emptyMessage}
          {repoDetails && (
            <>
              <DetailsItem
                label="Languages"
                value={repoDetails.languages
                  .map((language) => `${language.name} ${language.percentage}%`)
                  .join(" | ")}
              />
              <DetailsItem
                label="Readme"
                value={repoDetails.readmeUrl}
                component="a"
                target="_blank"
                href={repoDetails.readmeUrl}
                className={classes.primaryColor}
              />
              <DetailsItem
                label="Activity"
                value={repoDetails.activityUrl}
                component="a"
                target="_blank"
                href={repoDetails.activityUrl}
                className={classes.primaryColor}
              />
              <DetailsItem
                label="Stars"
                value={repoDetails.stars.toLocaleString()}
              />
              <DetailsItem
                label="Watching"
                value={repoDetails.watching.toLocaleString()}
              />
              <DetailsItem
                label="Forks"
                value={repoDetails.forks.toLocaleString()}
              />
              <DetailsItem
                label={`Releases (${repoDetails.releases.toLocaleString()})`}
                value={repoDetails.forks.toLocaleString()}
              />

              <Typography variant="body2">
                <strong>v{repoDetails.latestVersion}</strong>&nbsp;&nbsp;
                {new Date(
                  repoDetails.latestVersionDate
                ).toLocaleDateString()}{" "}
                <span className={classes.primaryColor}>
                  + {repoDetails.releases} releases
                </span>
              </Typography>
            </>
          )}
        </>
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
  label: {
    fontWeight: 600,
    paddingBlock: theme.spacing(0.5),
  },
  primaryColor: {
    color: theme.palette.primary.main,
  },
}));

const DetailsItem: FC<
  { label: string; value: string | number } & Partial<{
    component: string;
    href: string;
    target: string;
    className?: string;
  }>
> = ({ label, value, ...typograpyProps }) => {
  const { classes, cx } = useStyles();

  return (
    <div>
      <Typography variant="body2" className={cx(classes.label)}>
        {label}
      </Typography>
      <Typography variant="body2" {...typograpyProps}>
        {value}
      </Typography>
    </div>
  );
};
