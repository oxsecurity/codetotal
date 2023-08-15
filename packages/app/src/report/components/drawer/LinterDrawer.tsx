import { FC } from "react";
import { CodeTotalDrawer } from "../../../common/CodeTotalDrawer";
import { useSelectedLinterStore } from "../../stores/selected-linter-store";
import { LinterInfo } from "./LinterInfo";
import { clearSelectedLinter } from "../../actions/selected-linter-actions";

export const LinterDrawer: FC = () => {
  const { linter } = useSelectedLinterStore();

  return (
    <CodeTotalDrawer isOpen={!!linter} onClose={clearSelectedLinter}>
      <LinterInfo />
    </CodeTotalDrawer>
  );
};
