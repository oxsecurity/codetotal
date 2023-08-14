import { Paper, Theme, Typography } from "@mui/material";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";
import { SeverityBadge } from "../../../common/SeverityBadge";
import { useSelectedLinterStore } from "../../stores/selected-linter-store";
import { LinterLogo } from "../detection/LinterLogo";
import { IssuesTable } from "./IssuesTable";

export const LinterInfo: FC = () => {
  const { classes } = useStyles();
  const { linter } = useSelectedLinterStore();

  if (!linter) {
    return null;
  }

  return (
    <div className={classes.linterInfo}>
      {linter && (
        <div className={classes.header}>
          <LinterLogo linter={linter} />
          <Typography
            variant="body1"
            color="text.primary"
            fontWeight="bold"
            component="a"
            href={linter.docUrl.replace("/alpha/", "/beta/")}
            target="_blank"
            rel="noreferrer"
            className={classes.link}
          >
            docs
          </Typography>
        </div>
      )}
      <div>
        {linter.severity && <SeverityBadge severity={linter.severity} />}
      </div>
      <Paper>
        <IssuesTable linterName={linter.name} issues={linter?.issues || []} />
      </Paper>
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  linterInfo: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
  },
  header: {
    display: "flex",
    gap: theme.spacing(3),
    paddingBlockEnd: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  link: {
    color: theme.palette.primary.main,
    fontWeight: 400,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
