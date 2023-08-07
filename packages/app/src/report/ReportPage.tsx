import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnalysisErrorDialog } from "../common/AnalysisErrorDialog";
import { CodeTotalDrawer } from "../common/CodeTotalDrawer";
import { initReport } from "./actions/init-report-action";
import { LinterInfo } from "./components/LinterInfo";
import { NewAnalysisDialog } from "./components/NewAnalysisDialog";
import { ReportHeader } from "./components/ReportHeader";
import { ReportTabs } from "./components/ReportTabs";

const ReportPage: FC = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (requestId) {
        const success = await initReport(requestId);
        if (!success) {
          navigate("/");
        }
      }
    })();
  }, [requestId, navigate]);

  return (
    <div style={{ paddingBlockEnd: 60 }}>
      <ReportHeader ready />
      <ReportTabs />
      <CodeTotalDrawer>
        <LinterInfo />
      </CodeTotalDrawer>
      <AnalysisErrorDialog />
      <NewAnalysisDialog />
    </div>
  );
};

export default ReportPage;
