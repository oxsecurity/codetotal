import { FC, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnalysisErrorDialog } from "../common/AnalysisErrorDialog";
import { initProgress } from "./actions/init-report-action";
import { IssuesTable } from "./components/IssuesTable";
import { NewAnalysisDialog } from "./components/NewAnalysisDialog";
import { ReportDrawer } from "./components/ReportDrawer";
import { ReportHeader } from "./components/ReportHeader";
import { ReportTabs } from "./components/ReportTabs";

const ReportPage: FC = () => {
  const calls = useRef(0);
  const { requestId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (calls.current > 0 && requestId) {
        const success = await initProgress(requestId);
        if (!success) {
          navigate("/");
        }
      }
      calls.current += 1;
    })();
  }, [requestId, navigate]);

  return (
    <div style={{ paddingBlockEnd: 60 }}>
      <ReportHeader ready />
      <ReportTabs />
      <ReportDrawer>
        <IssuesTable />
      </ReportDrawer>
      <AnalysisErrorDialog />
      <NewAnalysisDialog />
    </div>
  );
};

export default ReportPage;
