import { Theme, Typography } from "@mui/material";
import { FC } from "react";
import { Linter } from "shared-types";
import { makeStyles } from "tss-react/mui";
import { ReactComponent as CheckovLogo } from "../../../assets/linters/checkov.svg";
import { ReactComponent as DevSkimLogo } from "../../../assets/linters/devskim.svg";
import { ReactComponent as GitLeaksLogo } from "../../../assets/linters/gitleaks.svg";

const logoOptions: Record<string, LogoOptions> = {
  gitleaks: { SVGLogo: GitLeaksLogo, showLabel: false },
  checkov: { SVGLogo: CheckovLogo, showLabel: false },
  devskim: { SVGLogo: DevSkimLogo, showLabel: false },
  grype: { showLabel: true },
};

interface LogoOptions {
  SVGLogo?: FC<React.SVGProps<SVGSVGElement>>;
  showLabel?: boolean;
}

export const LinterLogo: FC<LinterLogoProps> = ({ linter, className }) => {
  const { classes, cx } = useStyles();
  const options = logoOptions[linter.name];

  const img = (
    <img
      src={linter.logoUrl}
      alt={`${linter.name} logo`}
      className={classes.logo}
    />
  );

  const label = (
    <Typography variant="body1" className={classes.label} component="span">
      {linter.name}
    </Typography>
  );

  if (!options) {
    return (
      <span className={cx(classes.linterLogo, className)}>
        {img}
        {label}
      </span>
    );
  }

  if (options.SVGLogo) {
    const { SVGLogo } = options;
    return (
      <span className={cx(classes.linterLogo, className)}>
        <SVGLogo className={classes.logo} />
        {options.showLabel ? label : null}
      </span>
    );
  }

  return (
    <span className={cx(classes.linterLogo, className)}>
      {img}
      {options.showLabel ? label : null}
    </span>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  linterLogo: {
    display: "inline-flex",
    gap: theme.spacing(1),
    alignItems: "center",
  },
  label: {
    flexGrow: 1,
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "-webkit-box",
    whiteSpace: "normal",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    textTransform: "capitalize",
  },
  logo: {
    height: "1.3em",
    width: "auto",
  },
}));

interface LinterLogoProps {
  linter: Linter;
  className?: string;
}
