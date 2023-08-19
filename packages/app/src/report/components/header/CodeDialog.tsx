import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Theme,
  Tooltip,
} from "@mui/material";
import { FC, useState } from "react";
import { MdWrapText } from "react-icons/md";
import { makeStyles } from "tss-react/mui";
import { useReportStore } from "../../stores/fe-report-store";
import { useSnippetDialogStore } from "../../stores/snippet-dialog-store";
import { CodeViewer } from "./CodeViewer";

export const CodeDialog: FC = () => {
  const { classes } = useStyles();
  const { isOpen, close } = useSnippetDialogStore();
  const { code: snippet } = useReportStore();
  const [wrapText, setWrapText] = useState(false);

  return (
    <Dialog maxWidth="md" fullWidth open={isOpen} onClose={close}>
      <DialogContent>
        {snippet && <CodeViewer code={snippet} wrapLongLines={wrapText} />}
      </DialogContent>
      <Divider />
      <DialogActions className={classes.actions}>
        <Tooltip title={wrapText ? "Unwrap long lines" : "Wrap long lines"}>
          <IconButton
            onClick={() => setWrapText(!wrapText)}
            size="small"
            color="primary"
          >
            <MdWrapText />
          </IconButton>
        </Tooltip>
        <Button onClick={close}>Close (ESC)</Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  actions: {
    display: "flex",
    justifyContent: "space-between",
    paddingInline: theme.spacing(3),
  },
}));
