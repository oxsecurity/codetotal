import { Theme, Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import { makeStyles } from "tss-react/mui";

export const ReportHeaderSection: FC<BannerStatProps> = ({
  label,
  value,
  valueClassName,
  dataCy,
}) => {
  const { classes, cx } = useStyles();
  const isPrimitiveValue =
    typeof value === "string" || typeof value === "number";

  return (
    <div className={classes.reportHeaderSection}>
      <Typography variant="body2" component="p" className={classes.label}>
        {label}
      </Typography>
      {isPrimitiveValue ? (
        <Typography
          variant="body1"
          component="div"
          className={cx(classes.textValue, valueClassName)}
          data-cy={dataCy}
        >
          {value}
        </Typography>
      ) : (
        <>{value}</>
      )}
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  reportHeaderSection: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  label: {
    color: theme.palette.text.secondary,
  },
  textValue: {
    color: theme.palette.text.primary,
    fontWeight: "bold",
    textOverflow: "ellipsis",
    overflow: "hidden",
    lineHeight: 1,
  },
}));

interface BannerStatProps {
  label: string;
  value: string | number | ReactNode;
  valueClassName?: string;
  dataCy?: string;
}
