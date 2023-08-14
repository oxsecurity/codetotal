import { ListItem, ListItemButton, Theme, Typography } from "@mui/material";
import { FC, memo } from "react";
import { Linter } from "shared-types";
import { makeStyles } from "tss-react/mui";
import { selectLinter } from "../../actions/selected-linter-actions";
import { useSelectedLinterStore } from "../../stores/selected-linter-store";
import { LinterLogo } from "./LinterLogo";
import { LinterStatus } from "./LinterStatus";

const LinterListItemComponent: FC<LinterListItemProps> = ({
  linter,
  index,
  lintersCount,
  issuesCount,
}) => {
  const { classes } = useStyles();
  const { linter: selectedLinter } = useSelectedLinterStore();

  return (
    <ListItem
      key={linter.name || ""}
      disablePadding
      divider={index < lintersCount - 1}
    >
      <ListItemButton
        selected={linter.name === selectedLinter?.name}
        onClick={() => selectLinter(linter.name)}
        className={classes.listItem}
      >
        <LinterLogo className={classes.nameContainer} linter={linter} />

        <div className={classes.statsContainer}>
          {issuesCount > 0 && (
            <Typography variant="body2" color="text.secondary">
              {issuesCount} issues
            </Typography>
          )}

          <LinterStatus severity={linter.severity} status={linter.status} />
        </div>
      </ListItemButton>
    </ListItem>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  listItem: {
    minHeight: 50,
  },
  nameContainer: {
    flexGrow: 1,
  },
  statsContainer: {
    display: "flex",
    gap: theme.spacing(2),
  },
}));

interface LinterListItemProps {
  linter: Linter;
  index: number;
  lintersCount: number;
  issuesCount: number;
}

export const LinterListItem = memo(LinterListItemComponent);
