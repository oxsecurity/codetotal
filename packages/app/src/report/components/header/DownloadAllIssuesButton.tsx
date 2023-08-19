import { IconButton, Theme, Tooltip } from "@mui/material";
import { FC } from "react";
import { CSVLink } from "react-csv";
import { IoMdCloudDownload } from "react-icons/io";
import { makeStyles } from "tss-react/mui";
import { useReportStore } from "../../stores/fe-report-store";

export const DownloadAllIssuesButton: FC = () => {
  const { classes } = useStyles();
  const { allIssues, requestId } = useReportStore();

  const disabled = allIssues().length === 0;
  const button = (
    <IconButton
      size="small"
      color="primary"
      disabled={disabled}
      sx={{ textTransform: "none" }}
    >
      <IoMdCloudDownload />
    </IconButton>
  );
  const downloadLink = (
    <CSVLink
      filename={`codetotal-${requestId}.csv`}
      data={allIssues()}
      target="_blank"
      className={classes.exportToCSV}
      tabIndex={-1}
      style={{ outline: "none" }}
    >
      {button}
    </CSVLink>
  );

  return (
    <Tooltip title={disabled ? "No issues found" : "Download issues CSV"} arrow>
      <span>{disabled ? button : downloadLink}</span>
    </Tooltip>
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
  },
}));
