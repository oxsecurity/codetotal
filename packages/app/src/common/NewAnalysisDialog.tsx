import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Theme,
} from "@mui/material";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { AnalysisInputForm } from "../analysis/components/AnalysisInputForm";
import { useReportStore } from "../report/stores/fe-report-store";

export const NewAnalysisDialog: FC = () => {
  const { classes } = useStyles();
  const { newAnalysisDialogOpen, closeNewAnalysisDialog } = useReportStore();
  const navigate = useNavigate();

  const handleAfterSubmit = useCallback(
    (requestId: string) => {
      closeNewAnalysisDialog();
      navigate(`/report/${requestId}`);
    },
    [closeNewAnalysisDialog, navigate]
  );

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={newAnalysisDialogOpen}
      onClose={closeNewAnalysisDialog}
      scroll="body"
    >
      <DialogContent className={classes.dialogContent}>
        <AnalysisInputForm onAfterSubmit={handleAfterSubmit} />
      </DialogContent>
      <Divider />
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={closeNewAnalysisDialog}>Close (ESC)</Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    padding: 0,
  },
}));
