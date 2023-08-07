import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { FC, PropsWithChildren } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { makeStyles } from "tss-react/mui";
import { ReportStore, useReportStore } from "../report/stores/fe-report-store";

export const CodeTotalDrawer: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const { classes } = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const { selectedLinterName } = useReportStore();

  const closeDrawer = () => {
    ReportStore.setState({ selectedLinterName: undefined });
  };

  const closeButton = (
    <IconButton onClick={closeDrawer} size="small">
      <IoCloseSharp />
    </IconButton>
  );

  if (matches) {
    return (
      <Drawer
        classes={{ paper: classes.drawerPaper }}
        anchor={"right"}
        open={!!selectedLinterName}
        onClose={closeDrawer}
      >
        <div className={classes.drawer} role="presentation">
          <header className={classes.header}>{closeButton}</header>
          <div className={classes.main}>{children}</div>
        </div>
      </Drawer>
    );
  }

  return (
    <Dialog open={!!selectedLinterName} onClose={closeDrawer} fullWidth>
      <DialogTitle className={classes.header}>{closeButton}</DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  drawer: { width: "75vw" },
  drawerPaper: {
    backgroundColor: theme.palette.background.default,
  },
  header: {
    paddingBlockStart: theme.spacing(2),
    paddingInlineEnd: theme.spacing(2),
    textAlign: "end",
  },
  main: {
    padding: theme.spacing(2),
  },
}));
