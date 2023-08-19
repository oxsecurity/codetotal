import { useTheme } from "@mui/material";
import { FC, useMemo } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import darkStyle from "react-syntax-highlighter/dist/esm/styles/prism/material-dark";
import lightStyle from "react-syntax-highlighter/dist/esm/styles/prism/prism";
import { useReportStore } from "../../stores/fe-report-store";

export const CodeViewer: FC<CodeViewerProps> = ({ code, wrapLongLines }) => {
  const theme = useTheme();
  const style = useMemo(
    () => (theme.palette.mode === "dark" ? darkStyle : lightStyle),
    [theme]
  );
  const { language } = useReportStore();

  return (
    <SyntaxHighlighter
      language={language?.name}
      style={style}
      showLineNumbers
      wrapLongLines={wrapLongLines}
    >
      {code}
    </SyntaxHighlighter>
  );
};

interface CodeViewerProps {
  code: string;
  wrapLongLines: boolean;
}
