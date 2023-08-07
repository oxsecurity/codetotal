import Container from "@mui/material/Container/Container";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";
import { AppRouteProvider } from "./AppRouteProvider";
import { AppThemeProvider } from "./AppThemeProvider";
import { FOOTER_HEIGHT, Footer } from "./Footer";

export const App: FC = () => {
  const { classes } = useStyles();

  return (
    <AppThemeProvider>
      <CssBaseline />
      <Container maxWidth="lg" fixed className={classes.container}>
        <AppRouteProvider />
        <Footer />
      </Container>
    </AppThemeProvider>
  );
};

const useStyles = makeStyles()(() => ({
  container: { paddingBlockEnd: FOOTER_HEIGHT },
}));
