import { Theme, Typography } from "@mui/material";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";

export const DetailsItem: FC<DetailsItemProps> = ({
  label,
  value,
  ...typograpyProps
}) => {
  const { classes, cx } = useStyles();

  return (
    <div>
      <Typography variant="body2" className={cx(classes.label)}>
        {label}
      </Typography>
      <Typography variant="body2" {...typograpyProps}>
        {value}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  label: {
    fontWeight: 600,
    paddingBlock: theme.spacing(0.5),
  },
}));

type DetailsItemProps = { label: string; value: string | number } & Partial<{
  component: string;
  href: string;
  target: string;
  className?: string;
}>;
