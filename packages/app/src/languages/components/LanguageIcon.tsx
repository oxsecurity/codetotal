import { Theme, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { ProgrammingLanguage } from "shared-types";
import { makeStyles } from "tss-react/mui";
import { ReactComponent as JavaIcon } from "../../assets/languages/java.svg";
import { ReactComponent as TypescriptIcon } from "../../assets/languages/typescript.svg";

const iconsMap: Record<string, FC<React.SVGProps<SVGSVGElement>>> = {
  java: JavaIcon,
  typescript: TypescriptIcon,
};

export const LanguageIcon: FC<LanguageIconProps> = ({
  language,
  withLabel,
}) => {
  const { classes, cx } = useStyles();
  const theme = useTheme();
  const isDarkmode = theme.palette.mode === "dark";
  if (!language || !language.icon) {
    return null;
  }

  // only is dark mode and only for "plain" type icons
  // they require a background since when used with an img tag
  // colors can't be applied through css and we end up with a black colored icon
  const requiresBackground = isDarkmode && language.icon === "plain";
  const SVGIcon = iconsMap[language.name];

  return (
    <span
      className={cx(
        classes.languageIcon,
        requiresBackground && classes.darkmode
      )}
    >
      {SVGIcon ? (
        <SVGIcon className={classes.img} />
      ) : (
        <img
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${language.name?.toLowerCase()}/${language.name?.toLowerCase()}-${
            language.icon
          }.svg`}
          className={classes.img}
          alt="programming language icon"
        />
      )}
      {withLabel && (
        <Typography component="span" variant="body2" fontWeight={600}>
          {language.displayName}
        </Typography>
      )}
    </span>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  languageIcon: {
    display: "inline-flex",
    height: "1em",
    width: "1em",
    gap: theme.spacing(1),
    alignItems: "center",
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
  withLabel?: boolean;
}
