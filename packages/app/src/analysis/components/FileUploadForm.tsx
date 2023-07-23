import { Theme, Typography, alpha, darken } from "@mui/material";
import { filesize } from "filesize";
import { FC, useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { BiSolidCloudUpload } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import config from "../../config";
import { startAnalysis } from "../actions/analysis-actions";
import { AnalysisStore } from "../stores/analysis-store";

const MAX_SIZE = parseInt(config.CODETOTAL_UPLOAD_FILE_LIMIT_BYTES);

export const FileUploadForm: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onDrop = useCallback(
    (files: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 1) {
        setError("Multiple files upload is not supported");
        return;
      }
      if (
        fileRejections.length === 1 &&
        fileRejections[0].errors[0].code === "file-too-large"
      ) {
        setError(`File too large (max allowed: ${filesize(MAX_SIZE)})`);
        return;
      }
      if (fileRejections.length === 1) {
        setError(fileRejections[0].errors[0].message);
        return;
      }

      const file = files[0];
      AnalysisStore.setState({ file });
      startAnalysis(navigate);
    },
    [navigate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: MAX_SIZE,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />

      <div className={classes.dropZone}>
        <BiSolidCloudUpload className={classes.icon} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary">
              Drag and drop a file here
              <br />
              or
              <br />
              Click to browse
            </Typography>
            {error && (
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  icon: {
    fontSize: "5rem",
    color: theme.palette.primary.main,
  },
  dropZone: {
    border: `2px dashed ${theme.palette.divider}`,
    padding: theme.spacing(2),
    cursor: "pointer",
    transition: theme.transitions.create("background-color"),
    "&:hover,&:focus-within": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? alpha(theme.palette.background.paper, 0.2)
          : darken(theme.palette.background.paper, 0.05),
    },
  },
}));
