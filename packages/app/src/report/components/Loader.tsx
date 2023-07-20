import { CircularProgress, Theme, Typography } from "@mui/material";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";

export const Loader: FC<LoaderProps> = ({ text }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.loader}>
      <CircularProgress color="primary" />
      {text && (
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      )}
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  loader: {
    position: "absolute",
    inset: 0,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface LoaderProps {
  text?: string;
}
