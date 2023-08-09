import { Container, Theme, Typography } from "@mui/material";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";
import bg from "../../assets/bg.svg";
import oxLogo from "../../assets/ox.svg";
import { ToggleThemeButton } from "./ToggleThemeButton";

export const Footer: FC = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container maxWidth="lg">
        <div className={classes.footerContent}>
          <Typography
            variant="body2"
            className={classes.footerText}
            component="div"
          >
            <a
              href="https://codetotal.io/"
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              CodeTotal
            </a>
            brought to you by
            <img src={oxLogo} className={classes.oxLogo} alt="OX Logo" />
            <a
              href="https://ox.security"
              target="_blank"
              rel="noreferrer"
              className={classes.link}
            >
              OX Security,
            </a>
            <p>powered by</p>
            <a
              className={classes.link}
              rel="noreferrer"
              target="_blank"
              href="https://megalinter.io/"
            >
              MegaLinter
            </a>
          </Typography>
          <ToggleThemeButton />
        </div>
      </Container>
      <div className={classes.background} />
    </div>
  );
};

export const FOOTER_HEIGHT = 80;

const useStyles = makeStyles()((theme: Theme) => ({
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    left: 0,
    display: "flex",
    flexDirection: "column",
    height: FOOTER_HEIGHT,
    background: theme.palette.background.default,
    zIndex: 10,
  },
  background: {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
    backgroundSize: "contain",
    flexGrow: 1,
  },
  footerContent: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
    columnGap: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.divider}`,
    marginBlockStart: theme.spacing(1),
    paddingBlock: theme.spacing(1),
  },
  footerText: {
    display: "flex",
    alignItems: "center",
    gap: "0.5ch",
    flexWrap: "wrap",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontWeight: 600,
    "&:focus-within, &:hover": {
      textDecoration: "underline",
    },
  },
  oxLogo: {
    width: "1.3em",
    height: "auto",
  },
}));
