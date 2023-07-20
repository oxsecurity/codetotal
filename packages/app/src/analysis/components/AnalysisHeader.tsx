import { Theme, Typography } from "@mui/material";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";
import oxAvatar from "../../assets/ox-avatar.svg";

export const AnalysisHeader: FC = () => {
  const { classes } = useStyles();

  return (
    <header className={classes.header}>
      <img src={oxAvatar} alt="OX avatar" className={classes.avatar} />
      <Typography variant="h1" color="primary" className={classes.title}>
        CODE TOTAL
      </Typography>
      <Typography
        variant="caption"
        color="text.primary"
        className={classes.description}
      >
        Analyze any snippet, file, or repository to detect possible security
        flaws such as secret in code, open source vulnerability, code security,
        vulnerability, insecure infrastructure as code, and potential legal
        issues with open source licenses.
      </Typography>
    </header>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  header: {
    paddingBlockStart: theme.spacing(6),
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  avatar: {
    marginInlineStart: -20,
    width: 140,
    height: 130,
  },
  title: {
    marginBlockStart: theme.spacing(1),
    fontSize: 50,
    fontWeight: 800,
    letterSpacing: 0.3,
  },
  description: {
    marginBlockStart: theme.spacing(3),
    maxWidth: 420,
    display: "inline-block",
    lineHeight: 1.1,
    textAlign: "justify",
  },
}));
