import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnalysisErrorDialog } from "../../common/AnalysisErrorDialog";
import { initReport } from "../actions/init-report-action";
import { LinterDrawer } from "./drawer/LinterDrawer";
import { CodeDialog } from "./header/CodeDialog";
import { NewAnalysisDialog } from "./header/NewAnalysisDialog";
import { ReportHeader } from "./header/ReportHeader";
import { ReportTabs } from "./tabs/ReportTabs";

const ReportPage: FC = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (requestId) {
        const success = await initReport(requestId);
        if (!success) {
          // TODO: show error page to the user instead of auto redirecting
          navigate("/");
        }
      }
    })();
  }, [requestId, navigate]);

  return (
    <div style={{ paddingBlockEnd: 60 }}>
      <ReportHeader ready />
      <ReportTabs />
      <LinterDrawer />
      <AnalysisErrorDialog />
      <NewAnalysisDialog />
      <CodeDialog />
    </div>
  );
};

export default ReportPage;
