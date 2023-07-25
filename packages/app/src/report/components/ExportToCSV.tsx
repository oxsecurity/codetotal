import { IconButton, Theme, Tooltip, Zoom } from "@mui/material";
import { FC } from "react";
import { CSVLink } from "react-csv";
import { MdCloudDownload } from "react-icons/md";
import { AnalysisStatus } from "shared-types";
import { makeStyles } from "tss-react/mui";
import { useReportStore } from "../stores/fe-report-store";

export const ExportToCSV: FC = () => {
  const { classes } = useStyles();
  const { status, allIssues, requestId } = useReportStore();

  return (
    <Zoom in={status === AnalysisStatus.Completed}>
      <div>
        <Tooltip title="Download issues CSV" arrow placement="top">
          <span>
            <CSVLink
              filename={`codetotal-${requestId}.csv`}
              data={allIssues()}
              target="_blank"
              className={classes.exportToCSV}
            >
              <IconButton size="small" color="primary">
                <MdCloudDownload />
              </IconButton>
            </CSVLink>
          </span>
        </Tooltip>
      </div>
    </Zoom>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  exportToCSV: {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(1),
    color: theme.palette.primary.main,
    fontWeight: 400,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
