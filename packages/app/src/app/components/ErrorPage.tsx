import { Typography } from "@mui/material";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "tss-react/mui";

export const ErrorPage: FC = () => {
  const { classes } = useStyles();

  return (
    <>
      <header>
        <Typography variant="h5">An unexpected error has occured</Typography>
      </header>
      <main className={classes.errorPage}>
        <NavLink to="/">Back to homepage</NavLink>
      </main>
    </>
  );
};

const useStyles = makeStyles()(() => ({
  errorPage: {
    display: "grid",
    placeItems: "center",
  },
}));
