import { IconButton, Tooltip } from "@mui/material";
import { FC } from "react";
import { BiCodeAlt } from "react-icons/bi";
import { useReportStore } from "../../stores/fe-report-store";
import { useSnippetDialogStore } from "../../stores/snippet-dialog-store";

export const ShowCodeButton: FC = () => {
  const { code } = useReportStore();
  const { open } = useSnippetDialogStore();

  if (!code) {
    return null;
  }

  return (
    <Tooltip placement="top" arrow title="Show code">
      <IconButton onClick={open} size="small" color="primary">
        <BiCodeAlt style={{ width: "1em", height: "1em" }} />
      </IconButton>
    </Tooltip>
  );
};
