import { TextField, Theme } from "@mui/material";
import { FC, useCallback } from "react";
import { makeStyles } from "tss-react/mui";
import { LanguageSelector } from "../../languages/components/LanguageSelector";
import {
  clearLanguages,
  detectSnippetLanguage,
  setUserSelectedLanguage,
} from "../actions/analysis-language-actions";
import { AnalysisStore, useAnalysisStore } from "../stores/analysis-store";
import { AnalysisFormProps } from "./AnalysisInputForm";
import { SubmitButton } from "./SubmitButton";

export const CodeSnippetForm: FC<AnalysisFormProps> = ({ onSubmit }) => {
  const { classes } = useStyles();
  const {
    snippet,
    snippetEnabled,
    sending,
    detectedLanguage,
    userSelectedLanguage,
  } = useAnalysisStore();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    AnalysisStore.setState({ snippet: e.target.value });
    detectSnippetLanguage(e.target.value);
  }, []);

  return (
    <form className={classes.codeSnippetForm}>
      <TextField
        autoFocus
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
      <div className={classes.footer}>
        <LanguageSelector
          detectedLanguage={detectedLanguage}
          userSelectedLanguage={userSelectedLanguage}
          onChange={setUserSelectedLanguage}
          onClear={clearLanguages}
        />
        <SubmitButton
          fullWidth
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={!snippetEnabled() || sending === "loading"}
          loading={sending === "loading"}
          data-cy="submit"
        >
          Send Snippet
        </SubmitButton>
      </div>
    </form>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  codeSnippetForm: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    padding: theme.spacing(1),
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    alignItems: "stretch",
    
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
}));
