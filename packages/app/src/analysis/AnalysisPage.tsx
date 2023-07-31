import { Theme } from "@mui/material";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { AnalysisHeader } from "./components/AnalysisHeader";
import { AnalysisInputForm } from "./components/AnalysisInputForm";

const AnalysisPage: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleAfterSubmit = useCallback(
    (requestId: string) => {
      navigate({ pathname: `/report/${requestId}` });
    },
    [navigate]
  );

  return (
    <div style={{ paddingBlockEnd: 150 }}>
      <AnalysisHeader />
      <main className={classes.main}>
        <AnalysisInputForm onAfterSubmit={handleAfterSubmit} />
      </main>
    </div>
  );
};

export default AnalysisPage;

const useStyles = makeStyles()((theme: Theme) => ({
  main: {
    marginBlockStart: theme.spacing(3),
    maxWidth: 620,
    marginInline: "auto",
    borderRadius: 15,
    overflow: "hidden",
  },
}));
