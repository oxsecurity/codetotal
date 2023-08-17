import { AnalysisType, OneOfValues } from "@ct/shared-types";
import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const AnalysisTabPanel: FC<PropsWithChildren<AnalysisTabPanelProps>> = (
  props
) => {
  const { children, value, selectedValue, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== selectedValue}
      id={`analysis-tabpanel-${value}`}
      aria-labelledby={`analysis-tab-${value}`}
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
