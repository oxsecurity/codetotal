import { Theme, Typography } from "@mui/material";
import { FC, PropsWithChildren, ReactNode } from "react";
import { makeStyles } from "tss-react/mui";

export const ReportPanel: FC<PropsWithChildren<ReportPanelProps>> = ({
  title,
  children,
}) => {
  const { classes } = useStyles();

  return (
    <div>
      <div className={classes.header}>
        {title}
        <Typography
          variant="body2"
          color="primary"
          component="a"
          target="_blank"
          href="https://ox.security"
        >
          Do you want to automate checks?
        </Typography>
      </div>
      <div className={classes.main}>{children}</div>
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  header: {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    paddingBlock: theme.spacing(2),
    gap: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  main: {
    display: "grid",
    position: "relative",
    minHeight: "50vh",
  },
}));

interface ReportPanelProps {
  title: ReactNode;
}
