import { Alert, Paper, Tab, Tabs, Theme } from "@mui/material";
import { FC, useCallback } from "react";
import { AnalysisType, OneOfValues } from "shared-types";
import { makeStyles } from "tss-react/mui";
import { startAnalysis } from "../actions/analysis-actions";
import { AnalysisStore, useAnalysisStore } from "../stores/analysis-store";
import { AnalysisTabPanel } from "./AnalysisTabPanel";
import { CodeSnippetForm } from "./CodeSnippetForm";
import { FileUploadForm } from "./FileUploadForm";
import { RepositoryForm } from "./RepositoryForm";

export const AnalysisInputForm: FC<AnalysisInputFormProps> = ({
  onAfterSubmit,
}) => {
  const { classes } = useStyles();
  const { sending, inputType } = useAnalysisStore();

  const handleFormTypeChange = (
    _: unknown,
    newInputType: OneOfValues<typeof AnalysisType>
  ) => {
    AnalysisStore.setState({ inputType: newInputType });
  };

  const handleSubmit = useCallback(async () => {
    const requestId = await startAnalysis();
    onAfterSubmit(requestId);
  }, [onAfterSubmit]);

  return (
    <Paper elevation={1} className={classes.inputForm} square>
      <div className={classes.tabsContainer}>
        <Tabs
          selectionFollowsFocus
          value={inputType}
          onChange={handleFormTypeChange}
          aria-label="Choose input type"
          variant="fullWidth"
        >
          <Tab
            autoFocus
            label="Code Snippet"
            value={AnalysisType.Snippet}
            className={classes.tab}
          />
          <Tab label="File" value={AnalysisType.File} className={classes.tab} />
          <Tab
            label="Repository"
            value={AnalysisType.Repo}
            className={classes.tab}
          />
        </Tabs>
      </div>
      <div className={classes.tabPanel}>
        {sending === "error" && (
          <Alert severity="error" square>
            Unable to start scanning, please try again later
          </Alert>
        )}
        <AnalysisTabPanel
          value={AnalysisType.Snippet}
          selectedValue={inputType}
        >
          <CodeSnippetForm onSubmit={handleSubmit} />
        </AnalysisTabPanel>
        <AnalysisTabPanel value={AnalysisType.File} selectedValue={inputType}>
          <FileUploadForm onSubmit={handleSubmit} />
        </AnalysisTabPanel>
        <AnalysisTabPanel value={AnalysisType.Repo} selectedValue={inputType}>
          <RepositoryForm onSubmit={handleSubmit} />
        </AnalysisTabPanel>
      </div>
    </Paper>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  inputForm: {
    textAlign: "center",
    transition: theme.transitions.create("all"),
    display: "flex",
    flexDirection: "column",
    boxShadow:
      theme.palette.mode === "light"
        ? "0px 0px 10px 10px rgba(0, 3, 73, 0.02)"
        : `0px 0px 10px 10px #00000010`,
    width: "100%",
    marginInline: "auto",
    minHeight: 280,
  },
  tabsContainer: {
    borderBottom: 1,
    borderColor: theme.palette.divider,
    borderBottomStyle: "solid",
  },
  tab: {
    textTransform: "none",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  tabPanel: {
    flexGrow: 1,
    position: "relative",
  },
}));

interface AnalysisInputFormProps {
  onAfterSubmit(requestId: string): void;
}

export interface AnalysisFormProps {
  onSubmit(): void;
}
