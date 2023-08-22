import { OneOfValues, Severity } from "@ct/shared-types";
import { Theme, Typography } from "@mui/material";
import { FC } from "react";
import { BsExclamation } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline, MdOutlineWarningAmber } from "react-icons/md";
import { TbUrgent } from "react-icons/tb";
import { makeStyles } from "tss-react/mui";

export const SeverityBadge: FC<SeverityBadgeProps> = ({ severity }) => {
  const { classes } = useStyles();
  const color = colorsMap.get(severity);
  const Icon = iconsMap.get(severity);

  return (
    <span className={classes.severityBadge} style={{ color }}>
      <Icon className={classes.icon} />
      <Typography
        variant="body2"
        className={classes.text}
        component="span"
        style={{ color }}
      >
        {severity}
      </Typography>
    </span>
  );
};

const iconsMap = new Map([
  [Severity.Critical, TbUrgent],
  [Severity.High, MdErrorOutline],
  [Severity.Medium, MdOutlineWarningAmber],
  [Severity.Low, BsExclamation],
  [Severity.Clean, IoMdCheckmarkCircleOutline],
]);

const colorsMap = new Map<OneOfValues<typeof Severity>, string>([
  ["critical", "#D01502"],
  ["high", "#ea7373"],
  ["medium", "#FFC051"],
  ["low", "#5C94ED"],
  ["clean", "#33C600"],
]);

const useStyles = makeStyles()((theme: Theme) => ({
  severityBadge: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  icon: {
    fontSize: "1.3em",
  },
  text: {
    textTransform: "capitalize",
    fontWeight: 600,
    wordBreak: 'keep-all'
  },
}));

interface SeverityBadgeProps {
  severity: OneOfValues<typeof Severity>;
}
