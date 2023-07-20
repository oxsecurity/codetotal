import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { AnalysisType, OneOfValues } from "shared-types";

export const AnalysisTabPanel: FC<PropsWithChildren<AnalysisTabPanelProps>> = (
  props
) => {
  const { children, value, selectedValue, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== selectedValue}
      id={`simple-tabpanel-${selectedValue}`}
      aria-labelledby={`simple-tab-${selectedValue}`}
      {...other}
      style={{ height: "100%" }}
    >
      {value === selectedValue && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

interface AnalysisTabPanelProps {
  selectedValue: OneOfValues<typeof AnalysisType>;
  value: OneOfValues<typeof AnalysisType>;
}
