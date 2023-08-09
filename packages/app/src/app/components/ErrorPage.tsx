import { Button, Theme, Typography } from "@mui/material";
import { FC } from "react";
import { MdRefresh } from "react-icons/md";
import { makeStyles } from "tss-react/mui";

export const ErrorPage: FC = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.errorPage}>
      <div className={classes.emoji}>😳</div>
      <Typography variant="h3" color="text.secondary">
        Ooops!
      </Typography>
      <Typography variant="h5" color="text.secondary">
        An unexpected error has occured
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component="a"
        href="/"
        className={classes.link}
        startIcon={<MdRefresh />}
      >
        Refresh Page
      </Button>
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  errorPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBlockStart: theme.spacing(10),
    gap: theme.spacing(4),
  },
  emoji: {
    fontSize: "3rem",
  },
  link: {
    marginBlockStart: theme.spacing(5),
    // color: theme.palette.text.primary,
  },
}));
