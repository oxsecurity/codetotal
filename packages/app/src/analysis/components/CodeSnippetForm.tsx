import { Button, TextField, Theme } from "@mui/material";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { startAnalysis } from "../actions/analysis-actions";
import { detectSnippetLanguage } from "../actions/snippet-actions";
import { AnalysisStore, useAnalysisStore } from "../stores/analysis-store";

export const CodeSnippetForm: FC = () => {
  const { classes } = useStyles();
  const { snippet, snippetEnabled } = useAnalysisStore();
  const navigate = useNavigate();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const snippet = e.target.value;
    AnalysisStore.setState({ snippet });
    detectSnippetLanguage(snippet);
  }, []);

  const handleSubmit = () => {
    startAnalysis(navigate);
  };

  return (
    <div className={classes.codeSnippetForm}>
      <TextField
        rows={5}
        multiline
        fullWidth
        placeholder="Paste code snippet here"
        value={snippet}
        onChange={handleChange}
        margin="none"
        size="small"
        inputProps={{
          "data-cy": "snippet-input",
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!snippetEnabled()}
        data-cy="snippet-submit"
      >
        Check Snippet
      </Button>
    </div>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  codeSnippetForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(1),
  },
}));
