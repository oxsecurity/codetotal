import { FC } from "react";
import { makeStyles } from "tss-react/mui";
import { useReportStore } from "../stores/fe-report-store";
import { LintersList } from "./LintersList";
import { Loader } from "./Loader";

export const Detection: FC = () => {
  const { classes } = useStyles();
  const { linters = [] } = useReportStore();
  const loading = linters.length === 0;

  return (
    <div className={classes.detection}>
      {loading && <Loader text="Starting scan" />}
      {!loading && <LintersList />}
    </div>
  );
};

const useStyles = makeStyles()(() => ({
  detection: {
    height: "100%",
    position: "relative",
    display: "grid",
  },
}));
