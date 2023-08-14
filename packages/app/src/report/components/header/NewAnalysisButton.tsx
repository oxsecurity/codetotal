import { Button } from "@mui/material";
import { FC } from "react";
import { MdAdd } from "react-icons/md";
import { useNewAnalysisDialogStore } from "../../stores/analysis-dialog-store";

export const NewAnalysisButton: FC = () => {
  const { open } = useNewAnalysisDialogStore();
  return (
    <Button
      style={{ textTransform: "none" }}
      onClick={open}
      startIcon={<MdAdd />}
      variant="contained"
      size="small"
    >
      New Analysis
    </Button>
  );
};
