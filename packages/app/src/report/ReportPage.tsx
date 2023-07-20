import { FC, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { initProgress } from "./actions/init-report-action";
import { IssuesTable } from "./components/IssuesTable";
import { ReportDrawer } from "./components/ReportDrawer";
import { ReportHeader } from "./components/ReportHeader";
import { ReportTabs } from "./components/ReportTabs";

const ReportPage: FC = () => {
  const calls = useRef(0);
  const { requestId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (calls.current === 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      initProgress(requestId!, navigate);
      calls.current += 1;
    }
  }, [requestId, navigate]);

  return (
    <div style={{ paddingBlockEnd: 60 }}>
      <ReportHeader ready />
      <ReportTabs />
      <ReportDrawer>
        <IssuesTable />
      </ReportDrawer>
    </div>
  );
};

export default ReportPage;
