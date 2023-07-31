import { FC } from "react";
import { AnalysisErrorDialog } from "../common/AnalysisErrorDialog";
import { IssuesTable } from "./components/IssuesTable";
import { NewAnalysisDialog } from "./components/NewAnalysisDialog";
import { ReportDrawer } from "./components/ReportDrawer";
import { ReportHeader } from "./components/ReportHeader";
import { ReportTabs } from "./components/ReportTabs";

const ReportPage: FC = () => {
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
