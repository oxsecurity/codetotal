import { Theme, Typography } from "@mui/material";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";

export const ReportHeaderSection: FC<BannerStatProps> = ({
  label,
  value,
  valueClassName,
  dataCy,
}) => {
  const { classes } = useStyles();

  return (
    <div className={classes.stat}>
      <Typography variant="body2" component="p">
        {label}
      </Typography>
      <Typography
        variant="body1"
        component="div"
        className={valueClassName}
        data-cy={dataCy}
      >
        {value}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  stat: {
    "& > p": {
      color: theme.palette.text.secondary,
    },
    "& > div": {
      color: theme.palette.text.primary,
      fontWeight: "bold",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },
}));

interface BannerStatProps {
  label: string;
  value: string | number;
  valueClassName?: string;
  dataCy?: string;
}