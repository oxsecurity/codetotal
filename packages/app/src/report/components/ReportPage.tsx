import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnalysisErrorDialog } from "../../common/AnalysisErrorDialog";
import { CodeTotalDrawer } from "../../common/CodeTotalDrawer";
import { NewAnalysisDialog } from "../../common/NewAnalysisDialog";
import { initReport } from "../actions/init-report-action";
import { LinterInfo } from "./drawer/LinterInfo";
import { ReportHeader } from "./header/ReportHeader";
import { CodeDialog } from "./header/CodeDialog";
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
      <CodeTotalDrawer>
        <LinterInfo />
      </CodeTotalDrawer>
      <AnalysisErrorDialog />
      <NewAnalysisDialog />
      <CodeDialog />
    </div>
  );
};

export default ReportPage;
