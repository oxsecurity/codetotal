import { List } from "@mui/material";
import { FC } from "react";
import { makeStyles } from "tss-react/mui";
import { useReportStore } from "../../stores/fe-report-store";
import { LinterListItem } from "./LinterListItem";
import { useSelectedLinterStore } from "../../stores/selected-linter-store";

export const LintersList: FC = () => {
  const { classes } = useStyles();
  const { linters = [], issuesCount } = useReportStore();
  const { linter: selectedLinter } = useSelectedLinterStore();
  
  return (
    <div className={classes.lintersList}>
      <List className={classes.list}>
        {linters.map((linter, index) => {
          const issues = issuesCount(linter.name);

          return (
            <LinterListItem
              key={linter.name}
              linter={linter}
              index={index}
              lintersCount={linters.length}
              issuesCount={issues}
              selected={selectedLinter?.name === linter.name}
            />
          );
        })}
      </List>
    </div>
  );
};

const useStyles = makeStyles()(() => ({
  lintersList: {
    overflow: "hidden",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
}));
