import { FormControl, TextField, Theme } from "@mui/material";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { startAnalysis } from "../actions/analysis-actions";
import { AnalysisStore, useAnalysisStore } from "../stores/analysis-store";
import { SubmitButton } from "./SubmitButton";

export const RepositoryForm: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { repositoryURL, repoEnabled, sending } = useAnalysisStore();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    AnalysisStore.setState({ repositoryURL: e.target.value });
  }, []);

  const handleSubmit = () => {
    startAnalysis(navigate);
  };

  return (
    <div className={classes.repositoryForm}>
      <FormControl fullWidth>
        <TextField
          placeholder="Enter Repository URL"
          value={repositoryURL}
          onChange={handleChange}
        />
      </FormControl>

      <SubmitButton
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        loading={sending === "loading"}
        disabled={!repoEnabled()}
      >
        Check Repository
      </SubmitButton>
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  repositoryForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(1),
  },
}));
