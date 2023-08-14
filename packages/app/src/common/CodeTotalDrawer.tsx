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

export const CodeTotalDrawer: FC<PropsWithChildren<CodeTotalDrawerProps>> = ({
  isOpen,
  onClose,
  children,
}) => {
  const theme = useTheme();
  const { classes } = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const closeButton = (
    <IconButton onClick={onClose} size="small">
      <IoCloseSharp />
    </IconButton>
  );

  if (matches) {
    return (
      <Drawer
        classes={{ paper: classes.drawerPaper }}
        anchor={"right"}
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
      >
        <div className={classes.drawer} role="presentation">
          <header className={classes.header}>{closeButton}</header>
          <div className={classes.main}>{children}</div>
        </div>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth closeAfterTransition>
      <DialogTitle className={classes.header}>{closeButton}</DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

interface CodeTotalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

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
