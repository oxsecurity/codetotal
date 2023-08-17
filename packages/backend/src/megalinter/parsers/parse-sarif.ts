/* eslint-disable */
import { Issue, OneOfValues, Severity } from "@ct/shared-types";
import { BaseMessage } from "../megalinter-types";

export const parseSarif = (msg: any) => {
  console.log(`Processing sarif or json message from ${msg.linterKey}...`);
  let topSeverity: OneOfValues<typeof Severity> = Severity.Clean;
  let score = 0;
  let toolName = msg.linterId;
  const issues: Issue[] = [];

  // SBOM results case
  if (
    msg?.outputSarif &&
    msg.outputSarif?.properties &&
    msg.outputSarif.properties.isSBOM === true
  ) {
    const sbom = msg.outputSarif.runs[0].properties.megalinter.sbom;
    console.log("SBOM: " + JSON.stringify(sbom, null, 2)); // TODO Itay here do what you need with SBOM :)
  }

  // simple json, no sarif, like for trufflehog
  if (msg?.outputJson) {
    const jsonResult = msg.outputJson;
    console.log("JSON: " + JSON.stringify(jsonResult, null, 2)); // TODO Eyal do what you need with JSON :)
  }

  if (
    msg?.outputSarif &&
    msg.outputSarif?.runs &&
    msg.outputSarif.runs.length > 0 &&
    msg.outputSarif.runs[0]?.results
  ) {
    const toolResults: Result[] = msg.outputSarif.runs[0].results;

    // const jsonString = JSON.stringify(msg, null, 2); // Convert JSON data to a formatted string
    // fs.writeFile(`/Users/eyal/ox/code-total/local/${toolName}.json`, jsonString, 'utf8', (err) => {
    //   if (err) {
    //     console.error('Error writing JSON file:', err);
    //   } else {
    //     console.log('JSON file has been saved!');
    //   }
    // });

    toolResults.forEach((toolResult: Result) => {
      // console.log(toolName);
      // if (toolName == "tflint" || toolName == "semgrep") {
      //   let a = 1;
      //   console.log(toolResult);
      // }
      let location = "";
      let lineNumber = 1;
      let ruleId = "";
      let title = "";
      let severity: OneOfValues<typeof Severity>;
      if (toolResult?.locations && toolResult.locations.length > 0) {
        if (toolResult.locations[0]?.physicalLocation?.artifactLocation?.uri) {
          location =
            toolResult.locations[0].physicalLocation.artifactLocation.uri;
          if (
            location.startsWith("/tmp/") ||
            location.startsWith("file:///tmp/")
          ) {
            location = location
              .replace("file://", "")
              .split("/")
              .slice(3)
              .join("/");
          }
        }
        if (toolResult?.locations[0]?.physicalLocation?.region?.startLine) {
          lineNumber =
            toolResult.locations[0].physicalLocation.region.startLine;
        }
      }
      if (toolResult?.ruleId) {
        ruleId = toolResult?.ruleId;
      }

      if (toolResult?.message?.text && toolResult.message.text.length < 150) {
        title = toolResult.message.text;
      } else {
        const ruleInfo = msg.outputSarif?.runs?.[0]?.tool?.driver?.rules?.find(
          (i) => i?.id === toolResult.ruleId
        );
        if (ruleInfo != undefined) {
          if (
            ruleInfo?.shortDescription &&
            (!ruleInfo.shortDescription.text.includes(ruleId) ||
              ruleInfo.shortDescription.text.length - ruleId.length > 20)
          )
            title = ruleInfo.shortDescription.text;
          else if (ruleInfo?.fullDescription)
            title = ruleInfo.fullDescription.text;
          else if (ruleInfo?.help?.text) title = ruleInfo.help.text;
          else if (ruleInfo?.name) title = ruleInfo.name;
        }
      }
      if (!title && ruleId) {
        title = ruleId;
      }
      if (toolResult?.level) {
        if (severityMapping.hasOwnProperty(toolResult.level)) {
          severity = severityMapping[toolResult.level];
        } else {
          severity = "medium";
        }
      } else {
        severity = getSevirtyBasedOnProperty(toolResult, toolName);
      }

      issues.push({
        location,
        lineNumber,
        ruleId,
        title,
        severity,
      });
    });
  }

  if (issues.length > 0) {
    const severityOrder = ["critical", "high", "medium", "low"];
    issues.sort(
      (a, b) =>
        severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity)
    );
    topSeverity = issues[0].severity;
    const countBySeverity = issues.reduce((counts, item) => {
      const { severity } = item;
      counts[severity] = (counts[severity] || 0) + 1;
      return counts;
    }, {});
    const lowSum = countBySeverity["low"]
      ? Math.min(20, countBySeverity["low"] * 2)
      : 0;
    const mediumSum = countBySeverity["medium"]
      ? Math.min(40, countBySeverity["medium"] * 3)
      : 0;
    const highSum = countBySeverity["high"]
      ? Math.min(80, countBySeverity["high"] * 7)
      : 0;
    const criticalSum = countBySeverity["critical"]
      ? Math.min(100, countBySeverity["critical"] * 13)
      : 0;
    const totalSum = lowSum + mediumSum + highSum + criticalSum;
    score = Math.min(100, totalSum);
  }

  return { ...msg, issues, score, severity: topSeverity };
};

export interface SarifRawMessage extends BaseMessage {
  outputSarif: {
    properties: {
      isSBOM: boolean;
    };
    runs: {
      properties: {
        megalinter: {
          sbom: any;
        };
      };
      tool: {
        driver: {
          rules: {
            id: string;
            name: string;
            shortDescription: {
              text: string;
            };
            fullDescription: {
              text: string;
            };
            help?: any;
            helpUri?: string;
          }[];
        };
      };
      results: Result[];
    }[];
  };
  outputJson: any;
}

export interface SarifMessage extends BaseMessage {
  issues: Issue[];
}

interface Result {
  fixes?: any[];
  locations?: any[];
  message?: {
    text: string;
  };
  properties?: any;
  ruleId?: string;
  level?: string | number;
}

export const severityMapping: Record<string, OneOfValues<typeof Severity>> = {
  error: "high",
  warning: "medium",
  info: "low",
};

export const getSevirtyBasedOnProperty = (toolResult, toolName) => {
  if (toolName === "devskim") {
    if (!toolResult?.properties?.DevSkimSeverity) return "";

    const devSeverity = toolResult?.properties?.DevSkimSeverity;
    if (devSeverity == 1) return "low";
    if (devSeverity == 2) return "medium";
    if (devSeverity == 3) return "high";
    if (devSeverity == 4) return "high";
  }
  if (toolName.toLowerCase() === "bandit") {
    if (toolResult?.properties?.issue_severity)
      return toolResult?.properties?.issue_severity.toLowerCase();
  }
  return "medium";
};

// const gitleaks_filepath = '/Users/eyal/ox/code-total/local/gitleaks.json'
// const checkov_filepath = '/Users/eyal/ox/code-total/local/checkov.json'
// const tflint_filepath = '/Users/eyal/ox/code-total/local/tflint.json'
// const terrascan_filepath = '/Users/eyal/ox/code-total/local/terrascan.json'
// const devskim_filepath = '/Users/eyal/ox/code-total/local/devskim.json'
// const trivy_filepath = '/Users/eyal/ox/code-total/local/trivy.json'
// const bandit_filepath = '/Users/eyal/ox/code-total/local/bandit.json'
// const semgrep_filepath = '/Users/eyal/ox/code-total/local/semgrep.json'

// const files: string[] = [gitleaks_filepath, checkov_filepath, tflint_filepath, terrascan_filepath, devskim_filepath, trivy_filepath, bandit_filepath, semgrep_filepath]

// files.forEach((path: string) => {
//   fs.readFile(path, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading JSON file:', err);
//     } else {
//       try {
//         const debugMsg = JSON.parse(data);
//         const issues = getIssueList(debugMsg as SarifMessage);
//         console.log(path, issues.length);
//       } catch (parseError) {
//         console.error('Error parsing JSON:', parseError);
//       }
//     }
//   });
// });
