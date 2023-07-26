import { TextField, Theme, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { LanguageIcon } from "../../common/LanguageIcon";
import { fetchDetect } from "../../common/utils/detect-lanauge-utils";
import { startAnalysis } from "../actions/analysis-actions";
import { AnalysisStore, useAnalysisStore } from "../stores/analysis-store";
import { SubmitButton } from "./SubmitButton";

export const CodeSnippetForm: FC = () => {
  const { classes } = useStyles();
  const { snippet, snippetEnabled, sending, language } = useAnalysisStore();
  const navigate = useNavigate();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const snippet = e.target.value;
    AnalysisStore.setState({ snippet });
    fetchDetect(snippet);
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
      <div className={classes.footer}>
        <div>
          {language && language.name && (
            <div className={classes.language}>
              {language.icon ? (
                <LanguageIcon language={language} />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {language.name}
                </Typography>
              )}
            </div>
          )}
        </div>
        <SubmitButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!snippetEnabled() || sending === "loading"}
          loading={sending === "loading"}
          data-cy="submit"
        >
          Send Snippet
        </SubmitButton>
      </div>
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
  language: {
    display: "flex",
    gap: theme.spacing(1),
    alignSelf: "flex-start",
  },
  footer: {
    display: "flex",
    gap: theme.spacing(1),
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
}));
