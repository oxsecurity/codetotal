import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  SvgIcon,
  Theme,
  Typography,
} from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { resetReport } from "../report/actions/error-report-action";
import { useReportStore } from "../report/stores/fe-report-store";

export const AnalysisErrorDialog: FC = () => {
  const { classes } = useStyles();
  const { analysisError, reset } = useReportStore();
  const [open, setOpen] = useState(!!analysisError);
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    setOpen(false);
    resetReport();
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    !!analysisError && setOpen(true);
  }, [analysisError]);

  return (
    <Dialog
      maxWidth="lg"
      open={open}
      onAnimationEnd={reset}
      onClose={handleClose}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <SvgIcon component={MdErrorOutline} color="error" />
        An error has occured
      </DialogTitle>
      <Divider orientation="horizontal" />
      <DialogContent className={classes.dialogContent}>
        <div>
          <Typography variant="body2" color="text.secondary">
            Code
          </Typography>
          <Typography variant="body2" color="text.primary">
            {analysisError?.errorCode}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="text.secondary">
            Message
          </Typography>
          <Typography variant="body2" color="text.primary">
            {analysisError?.errorMessage}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="text.secondary">
            Details
          </Typography>
          <Typography variant="body2" color="text.primary">
            {analysisError?.errorDetails}
          </Typography>
        </div>
      </DialogContent>
      <Divider orientation="horizontal" />
      <DialogActions sx={{ padding: 2 }}>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));
