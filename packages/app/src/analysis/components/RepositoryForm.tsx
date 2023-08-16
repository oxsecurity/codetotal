import { FormControl, TextField, Theme } from "@mui/material";
import { FC, SyntheticEvent, useCallback } from "react";
import { makeStyles } from "tss-react/mui";
import { AnalysisStore, useAnalysisStore } from "../stores/analysis-store";
import { AnalysisFormProps } from "./AnalysisInputForm";
import { SubmitButton } from "./SubmitButton";

export const RepositoryForm: FC<AnalysisFormProps> = ({ onSubmit }) => {
  const { classes } = useStyles();
  const { repositoryURL, repoEnabled, sending } = useAnalysisStore();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    AnalysisStore.setState({ repositoryURL: e.target.value });
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={classes.repositoryForm} onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <TextField
          autoFocus
          placeholder="Enter Repository URL"
          value={repositoryURL}
          onChange={handleChange}
        />
      </FormControl>

      <SubmitButton
        variant="contained"
        color="primary"
        loading={sending === "loading"}
        disabled={!repoEnabled()}
      >
        Check Repository
      </SubmitButton>
    </form>
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
