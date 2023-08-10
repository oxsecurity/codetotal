import { Theme, Typography } from "@mui/material";
import { FC } from "react";
import { Linter } from "shared-types";
import { makeStyles } from "tss-react/mui";
import { ReactComponent as CheckovLogo } from "../../../assets/linters/checkov.svg";
import { ReactComponent as DevSkimLogo } from "../../../assets/linters/devskim.svg";
import { ReactComponent as GitLeaksLogo } from "../../../assets/linters/gitleaks.svg";
import { ReactComponent as KicsLogo } from "../../../assets/linters/kics.svg";
import secretLintLogoUrl from "../../../assets/linters/secretlint.png";

const logoOptions: Record<string, LogoOptions> = {
  gitleaks: { SVGLogo: GitLeaksLogo, showLabel: true },
  checkov: { SVGLogo: CheckovLogo, showLabel: true },
  devskim: { SVGLogo: DevSkimLogo, showLabel: true },
  grype: { showLabel: true },
  kics: { SVGLogo: KicsLogo, showLabel: true },
  secretlint: {
    SVGLogo: (props) => (
      <img
        src={secretLintLogoUrl}
        alt="SecretLint logo"
        {...(props as unknown as React.HTMLProps<HTMLImageElement>)}
      />
    ),
    showLabel: true,
  },
};

interface LogoOptions {
  SVGLogo?: FC<React.SVGProps<SVGSVGElement>>;
  showLabel?: boolean;
}

export const LinterLogo: FC<LinterLogoProps> = ({ linter, className }) => {
  const { classes, cx } = useStyles();
  const options = logoOptions[linter.name];

  const img = (
    <span className={classes.logoContainer}>
      <img
        src={linter.logoUrl}
        alt={`${linter.name} logo`}
        className={classes.logo}
      />
    </span>
  );

  const label = (
    <Typography variant="body2" className={classes.label} component="span">
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
        <span className={classes.logoContainer}>
          <SVGLogo className={classes.logo} />
        </span>
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
    alignItems: "center",
    gap: theme.spacing(1),
  },
  label: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "block",
    whiteSpace: "normal",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    textTransform: "capitalize",
  },
  logoContainer: {
    alignSelf: "center",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: "auto",
    width: "1.5em",
  },
}));

interface LinterLogoProps {
  linter: Linter;
  className?: string;
}
