import { Theme, Typography } from "@mui/material";
import { FC } from "react";
import { RepoDetails } from "shared-types";
import { makeStyles } from "tss-react/mui";
import { DetailsItem } from "./DetailsItem";

export const RepoInfo: FC<RepoInfoProps> = ({ repoDetails }) => {
  const { classes } = useStyles();
  return (
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
      <DetailsItem label="Stars" value={repoDetails.stars.toLocaleString()} />
      <DetailsItem
        label="Watching"
        value={repoDetails.watching.toLocaleString()}
      />
      <DetailsItem label="Forks" value={repoDetails.forks.toLocaleString()} />
      <DetailsItem
        label={`Releases (${repoDetails.releases.toLocaleString()})`}
        value={repoDetails.forks.toLocaleString()}
      />

      <Typography variant="body2">
        <strong>v{repoDetails.latestVersion}</strong>&nbsp;&nbsp;
        {new Date(repoDetails.latestVersionDate).toLocaleDateString()}{" "}
        <span className={classes.primaryColor}>
          + {repoDetails.releases} releases
        </span>
      </Typography>
    </>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  primaryColor: {
    color: theme.palette.primary.main,
  },
}));

interface RepoInfoProps {
  repoDetails: RepoDetails;
}
