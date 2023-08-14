import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";
import { FC } from "react";
import { useReportStore } from "../../stores/fe-report-store";
import { useSnippetDialogStore } from "../../stores/snippet-dialog-store";
import { CodeViewer } from "./SyntaxHighlighter";

export const CodeDialog: FC = () => {
  const { isOpen, close } = useSnippetDialogStore();
  const { code: snippet } = useReportStore();

  return (
    <Dialog maxWidth="md" fullWidth open={isOpen} onClose={close}>
      <DialogContent>{snippet && <CodeViewer code={snippet} />}</DialogContent>
      <Divider />
      <DialogActions sx={{ paddingInline: 3 }}>
        <Button onClick={close}>Close (ESC)</Button>
      </DialogActions>
    </Dialog>
  );
};
