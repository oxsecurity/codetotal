import { FC, PropsWithChildren } from "react";

export const ReportTabPanel: FC<PropsWithChildren<ReportTabPanelProps>> = (
  props
) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: "100%" }}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

interface ReportTabPanelProps {
  index: number;
  value: number;
}
