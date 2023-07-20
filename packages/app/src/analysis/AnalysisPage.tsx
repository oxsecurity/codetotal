import { FC, useEffect } from "react";
import { AnalysisHeader } from "./components/AnalysisHeader";
import { InputForm } from "./components/InputForm";
import { clearAnalysisStore } from "./stores/analysis-store";

const AnalysisPage: FC = () => {
  useEffect(() => {
    return () => {
      // on unmount
      clearAnalysisStore();
    };
  }, []);

  return (
    <div style={{ paddingBlockEnd: 150 }}>
      <AnalysisHeader />
      <InputForm />
    </div>
  );
};

export default AnalysisPage;
