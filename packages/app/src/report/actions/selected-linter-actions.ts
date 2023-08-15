import { Linter } from "shared-types";
import { ReportStore } from "../stores/fe-report-store";
import { SelectedLinterStore } from "../stores/selected-linter-store";

export const selectLinter = (name: Linter["name"]) => {
  const { linters } = ReportStore.getState();
  const linter = linters?.find((linter) => linter.name === name);

  if (linter) {
    SelectedLinterStore.setState({ linter });
  } else {
    console.warn(`Can't resolve linter by name "${name}"`);
  }
};

export const clearSelectedLinter = () => {
  SelectedLinterStore.setState({ linter: undefined });
};
