import {
  Box,
  Tab,
  Tabs,
  Theme,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { ReportType } from "../../fe-report-types";
import { Detection } from "../detection/Detection";
import { SBOM } from "../sbom/SBOM";
import { ReportPanel } from "./ReportPanel";
import { ReportTabPanel } from "./ReportTabPanel";

export const ReportTabs: FC = () => {
  const theme = useTheme();
  const { classes } = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [panelType, setPanelType] = useState<ReportType>(ReportType.Detection);

  const handlePanelTypeChange = (_: unknown, value: number) => {
    setPanelType(value);
  };

  return (
    <>
      <Box
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          marginBlockStart: 4,
        }}
      >
        <Tabs
          variant={matches ? "standard" : "fullWidth"}
          aria-label="Select report type"
          selectionFollowsFocus
          value={panelType}
          onChange={handlePanelTypeChange}
        >
          <Tab
            label="Detection"
            className={classes.tab}
            classes={{ selected: classes.selectedTab }}
          />
          {/* <Tab
            label="Details"
            className={classes.tab}
            classes={{ selected: classes.selectedTab }}
          /> */}
          <Tab
            label="SBOM"
            className={classes.tab}
            classes={{ selected: classes.selectedTab }}
          />
        </Tabs>
      </Box>
      <ReportTabPanel value={panelType} index={0}>
        <ReportPanel
          title={
            <Typography variant="body2">Security tools' analysis</Typography>
          }
        >
          <Detection />
        </ReportPanel>
      </ReportTabPanel>
      {/* <ReportTabPanel value={panelType} index={1}>
        <ReportPanel title={<Typography variant="body2">Resource</Typography>}>
          <Details />
        </ReportPanel>
      </ReportTabPanel> */}
      <ReportTabPanel value={panelType} index={1}>
        <ReportPanel
          title={<Typography variant="body2">SBOM Packages</Typography>}
        >
          <SBOM />
        </ReportPanel>
      </ReportTabPanel>
    </>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  tab: {
    textTransform: "none",

    transition: theme.transitions.create("background"),
    [theme.breakpoints.up("md")]: {
      minWidth: 180,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
  },
  selectedTab: {
    background: alpha("#6837FF", 0.1),
  },
}));
