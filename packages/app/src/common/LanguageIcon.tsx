import { Theme, Tooltip, useTheme } from "@mui/material";
import { FC } from "react";
import { ProgrammingLanguage } from "shared-types";
import { makeStyles } from "tss-react/mui";

export const LanguageIcon: FC<LanguageIconProps> = ({ language }) => {
  const { classes, cx } = useStyles();
  const theme = useTheme();
  const isDarkmode = theme.palette.mode === "dark";
  if (!language) {
    return null;
  }

  // only is dark mode and only for "plain" type icons
  // they require a background since when used with an img tag
  // colors can't be applied through css and we end up with a black colored icon
  const requiresBackground = isDarkmode && language.icon === "plain";

  return (
    <Tooltip title={language.name || ""} arrow placement="top">
      <span
        className={cx(
          classes.languageIcon,
          requiresBackground && classes.darkmode
        )}
      >
        <img
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${language.name?.toLowerCase()}/${language.name?.toLowerCase()}-${
            language.icon
          }.svg`}
          className={classes.img}
          alt="programming language icon"
        />
      </span>
    </Tooltip>
  );
};
const useStyles = makeStyles()((theme: Theme) => ({
  languageIcon: {
    display: "inline-flex",
    height: "2em",
    width: "2em",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  darkmode: {
    backgroundColor: theme.palette.text.secondary,
    borderRadius: "50%",
    display: "inline-flex",
  },
}));

interface LanguageIconProps {
  language?: ProgrammingLanguage;
}
