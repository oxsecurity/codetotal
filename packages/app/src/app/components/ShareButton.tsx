import { Alert, AlertTitle, Button, Slide, Snackbar } from "@mui/material";
import { FC, useState } from "react";
import { makeStyles } from "tss-react/mui";

const CODE_TOTAL_URL = "https://codetotal.io";

export const ShareButton: FC = () => {
  const { classes } = useStyles();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleShare = async () => {
    try {
      setLoading(true);
      await navigator.clipboard.writeText(CODE_TOTAL_URL);
      setSuccess(true);
    } catch (err) {
      setError(true);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(false);
    setSuccess(false);
  };

  return (
    <>
      <Button
        size="small"
        startIcon={<i style={{ fontSize: "1em" }}>&#x1F496;</i>}
        onClick={handleShare}
        disabled={loading}
      >
        Share
      </Button>

      <Snackbar
        open={error}
        onClose={handleClose}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleClose} severity="error">
          <AlertTitle>Unable to copy URL to clipboard</AlertTitle>
          Please copy or click the following URL manually to share:&nbsp;
          <a
            href={CODE_TOTAL_URL}
            target="_blank"
            rel="noreferrer"
            className={classes.link}
          >
            {CODE_TOTAL_URL}
          </a>
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        onClose={handleClose}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Slide}
      >
        <Alert severity="info" onClose={handleClose}>
          <AlertTitle>URL copied successfully</AlertTitle>
          <div className={classes.thankYou}>
            Thank you for sharing CodeTotal with the community&nbsp;
            <span style={{ fontSize: "2em" }}>&#x1F497;</span>
          </div>
        </Alert>
      </Snackbar>
    </>
  );
};

const useStyles = makeStyles()((theme) => ({
  link: {
    color: "inherit",
    fontWeight: "bold",
  },
  thankYou: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
}));
