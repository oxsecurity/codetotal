- [Development Mode](#development-mode)
- [Available Scripts](#available-scripts)
- [Config](#config)
- [Building For Production](#building-for-production)
- [Debugging in VSCode](#debugging-in-vscode)
- [Messages from MegaLinter server](#messages-from-megalinter-server)
  - [Start MegaLinter analysis](#start-megalinter-analysis)
  - [Start Linter analysis](#start-linter-analysis)
  - [Complete Linter analysis](#complete-linter-analysis)
  - [Complete MegaLinter analysis](#complete-megalinter-analysis)
  - [MegaLinter server error](#megalinter-server-error)
- [Release Management](#release-management)

## Development Mode

- Clone this repo
- Run `npm i` to install dependencies
- Start megalinter server `npm run start:megalinter`
- Run `npm start`
- Open [`codetotal app`](http://localhost:3000)

## Available Scripts

- `npm start` start all projects in development mode
- `npm run lint` lint all projects
- `npm run build:be` build the backend (used by `launch.json` file for debugging)
- `npm run start:fe` start the FE in development mode
- `npm test` run all unit tests

## Config

Add a `.env` file in the root of the project.  
Only variables starting with the `CODETOTAL_` prefix will be injected into the frontend bundle.

```ini
# MEGALINTER
MEGALINTER_ANALYSIS_URL=http://127.0.0.1:8000/analysis
MEGALINTER_UPLOAD_URL=http://127.0.0.1:8000/upload-file
MEGALINTER_REDIS_URL=redis://127.0.0.1:6379
MEGALINTER_REDIS_CHANNEL=megalinter:pubsub:<request-id>

# BACKEND
CODETOTAL_HTTP_PORT=8081
CODETOTAL_HTTP_HOST=127.0.0.1
CODETOTAL_WS_PORT=8080
CODETOTAL_WS_HOST=127.0.0.1
DEBUG_MODULES=actions,megalinter,stores,transport

# FRONTEND
CODETOTAL_UPLOAD_FILE_LIMIT_BYTES=10000000
```

## Building For Production

- Config files must be set before the build (see `Config` section)
- Run `npm run build` at the root folder
- This will create a `dist` folder with the backend code
- The frontend code will be under `dist/public`
- Run using `npm run production` (equivalent to `node dist/index.js`)

## Debugging in VSCode

Add a `launch.json` file under the `.vscode` folder with the following content:

```typescript
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Build Project",
      "program": "${workspaceFolder}/packages/backend/dist/index.js",
      "envFile": "${workspaceFolder}/.env",
      "preLaunchTask": "npm: build:be",
      "sourceMaps": true,
      "smartStep": true,
      "internalConsoleOptions": "openOnSessionStart",
      "outFiles": ["${workspaceFolder}/packages/backend/dist/**/*.js"]
    }
  ]
}
```

## Messages from MegaLinter server

Event-based management of MegaLinter Server can send the following list of messages into Redis PUBSUB channel built the following way: **megalinter:pubsub:REQUEST_ID**

Example: `megalinter:pubsub:RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004`

### Start MegaLinter analysis

This message is sent once by analysis, when a **MegaLinter instance has identified the linters to run** and is about to start them.

Example of **megalinterStart** messageType:

```json
{
  "messageType": "megalinterStart",
  "megaLinterStatus": "created",
  "linters": [
    {
      "descriptorId": "BASH",
      "linterId": "bash-exec",
      "linterKey": "BASH_EXEC",
      "linterVersion": "5.2.15",
      "linterCliLintMode": "file",
      "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
      "docUrl": "https://megalinter.io/alpha/descriptors/bash_bash_exec",
      "iconPngUrl": "https://raw.githubusercontent.com/oxsecurity/megalinter/main/docs/assets/icons/linters/bash-exec.png",
      "isFormatter": false,
      "isSBOM": false,
      "filesNumber": 1
    },
    {
      "descriptorId": "BASH",
      "linterId": "shellcheck",
      "linterKey": "BASH_SHELLCHECK",
      "linterVersion": "0.9.0",
      "linterCliLintMode": "list_of_files",
      "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
      "docUrl": "https://megalinter.io/alpha/descriptors/bash_shellcheck",
      "iconPngUrl": "https://raw.githubusercontent.com/oxsecurity/megalinter/main/docs/assets/icons/linters/shellcheck.png",
      "isFormatter": false,
      "isSBOM": false,
      "filesNumber": 1
    },
    {
      "descriptorId": "BASH",
      "linterId": "shfmt",
      "linterKey": "BASH_SHFMT",
      "linterVersion": "ERROR",
      "linterCliLintMode": "list_of_files",
      "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
      "docUrl": "https://megalinter.io/alpha/descriptors/bash_shfmt",
      "iconPngUrl": "https://raw.githubusercontent.com/oxsecurity/megalinter/main/docs/assets/icons/linters/shfmt.png",
      "isFormatter": true,
      "isSBOM": false,
      "filesNumber": 1
    },
    {
      "descriptorId": "COPYPASTE",
      "linterId": "jscpd",
      "linterKey": "COPYPASTE_JSCPD",
      "linterVersion": "ERROR",
      "linterCliLintMode": "project",
      "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
      "docUrl": "https://megalinter.io/alpha/descriptors/copypaste_jscpd",
      "isFormatter": false,
      "isSBOM": false
    },
    {
      "descriptorId": "REPOSITORY",
      "linterId": "checkov",
      "linterKey": "REPOSITORY_CHECKOV",
      "linterVersion": "3.11",
      "linterCliLintMode": "project",
      "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
      "docUrl": "https://megalinter.io/alpha/descriptors/repository_checkov",
      "iconPngUrl": "https://raw.githubusercontent.com/oxsecurity/megalinter/main/docs/assets/icons/linters/checkov.png",
      "isFormatter": false,
      "isSBOM": false
    },
    {
      "descriptorId": "REPOSITORY",
      "linterId": "devskim",
      "linterKey": "REPOSITORY_DEVSKIM",
      "linterVersion": "1.0.11",
      "linterCliLintMode": "project",
      "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
      "docUrl": "https://megalinter.io/alpha/descriptors/repository_devskim",
      "iconPngUrl": "https://raw.githubusercontent.com/oxsecurity/megalinter/main/docs/assets/icons/linters/devskim.png",
      "isFormatter": false,
      "isSBOM": false
    },
    {
      "descriptorId": "REPOSITORY",
      "linterId": "dustilock",
      "linterKey": "REPOSITORY_DUSTILOCK",
      "linterVersion": "1.2.0",
      "linterCliLintMode": "project",
      "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
      "docUrl": "https://megalinter.io/alpha/descriptors/repository_dustilock",
      "iconPngUrl": "https://raw.githubusercontent.com/oxsecurity/megalinter/main/docs/assets/icons/linters/dustilock.png",
      "isFormatter": false,
      "isSBOM": false
    },
    {
      "descriptorId": "REPOSITORY",
      "linterId": "git_diff",
      "linterKey": "REPOSITORY_GIT_DIFF",
      "linterVersion": "2.38.5",
      "linterCliLintMode": "project",
      "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
      "docUrl": "https://megalinter.io/alpha/descriptors/repository_git_diff",
      "isFormatter": false,
      "isSBOM": false
    },
    {
      "descriptorId": "REPOSITORY",
      "linterId": "gitleaks",
      "linterKey": "REPOSITORY_GITLEAKS",
      "linterVersion": "8.17.0",
      "linterCliLintMode": "project",
      "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
      "docUrl": "https://megalinter.io/alpha/descriptors/repository_gitleaks",
      "iconPngUrl": "https://raw.githubusercontent.com/oxsecurity/megalinter/main/docs/assets/icons/linters/gitleaks.png",
      "isFormatter": false,
      "isSBOM": false
    },
    {
      "descriptorId": "REPOSITORY",
      "linterId": "kics",
      "linterKey": "REPOSITORY_KICS",
      "linterVersion": "1.7.3",
      "linterCliLintMode": "project",
      "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
      "docUrl": "https://megalinter.io/alpha/descriptors/repository_kics",
      "iconPngUrl": "https://raw.githubusercontent.com/oxsecurity/megalinter/main/docs/assets/icons/linters/kics.png",
      "isFormatter": false,
      "isSBOM": false
    },
    {
      "descriptorId": "REPOSITORY",
      "linterId": "secretlint",
      "linterKey": "REPOSITORY_SECRETLINT",
      "linterVersion": "7.0.3",
      "linterCliLintMode": "project",
      "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
      "docUrl": "https://megalinter.io/alpha/descriptors/repository_secretlint",
      "iconPngUrl": "https://raw.githubusercontent.com/oxsecurity/megalinter/main/docs/assets/icons/linters/secretlint.png",
      "isFormatter": false,
      "isSBOM": false
    },
    {
      "descriptorId": "REPOSITORY",
      "linterId": "semgrep",
      "linterKey": "REPOSITORY_SEMGREP",
      "linterVersion": "1.31.2",
      "linterCliLintMode": "project",
      "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
      "docUrl": "https://megalinter.io/alpha/descriptors/repository_semgrep",
      "iconPngUrl": "https://raw.githubusercontent.com/oxsecurity/megalinter/main/docs/assets/icons/linters/semgrep.png",
      "isFormatter": false,
      "isSBOM": false
    },
    {
      "descriptorId": "REPOSITORY",
      "linterId": "trivy",
      "linterKey": "REPOSITORY_TRIVY",
      "linterVersion": "0.43.1",
      "linterCliLintMode": "project",
      "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
      "docUrl": "https://megalinter.io/alpha/descriptors/repository_trivy",
      "iconPngUrl": "https://raw.githubusercontent.com/oxsecurity/megalinter/main/docs/assets/icons/linters/trivy.png",
      "isFormatter": false,
      "isSBOM": false
    },
    {
      "descriptorId": "SPELL",
      "linterId": "cspell",
      "linterKey": "SPELL_CSPELL",
      "linterVersion": "ERROR",
      "linterCliLintMode": "list_of_files",
      "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
      "docUrl": "https://megalinter.io/alpha/descriptors/spell_cspell",
      "isFormatter": false,
      "filesNumber": 1,
      "isSBOM": false
    }
  ],
  "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004"
}
```

### Start Linter analysis

This message is sent once by linter run, it indicates that **a single linter has started running**.

Example of **linterStart** messageType with `linterCliLintMode=project`:

```json
{
  "messageType": "linterStart",
  "linterStatus": "started",
  "descriptorId": "REPOSITORY",
  "linterId": "trivy",
  "linterKey": "REPOSITORY_TRIVY",
  "linterVersion": "0.43.1",
  "linterCliLintMode": "project",
  "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
  "docUrl": "https://megalinter.io/alpha/descriptors/repository_trivy",
  "isFormatter": false,
  "isSBOM": false
}
```

Example of **linterStart** messageType with `linterCliLintMode=list_of_files` (with **filesNumber** additional property):

```json
{
  "messageType": "linterStart",
  "linterStatus": "started",
  "descriptorId": "BASH",
  "linterId": "shellcheck",
  "linterKey": "BASH_SHELLCHECK",
  "linterVersion": "0.9.0",
  "linterCliLintMode": "list_of_files",
  "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
  "docUrl": "https://megalinter.io/alpha/descriptors/bash_shellcheck",
  "isFormatter": false,
  "isSBOM": false,
  "filesNumber": 1
}
```

### Complete Linter analysis

This message is sent once by linter run, it indicates that **a single linter has been completed**.

If SARIF is available, it will be located in `outputSarif` property, otherwise results can be found in `outputText` and or `outputJson`.

Example of **linterComplete** messageType:

```json
{
  "messageType": "linterComplete",
  "linterStatus": "success",
  "linterErrorNumber": 0,
  "linterStatusMessage": "No errors were found in the linting process",
  "linterElapsedTime": 11.16,
  "linterCliCommand": [
    "trivy",
    "fs",
    "--scanners",
    "vuln,config",
    "--exit-code",
    "1",
    "--format",
    "sarif",
    "-o",
    "/tmp/ct-megalinter-xmv82bvyv/megalinter-reports/sarif/REPOSITORY_TRIVY.sarif",
    "."
  ],
  "descriptorId": "REPOSITORY",
  "linterId": "trivy",
  "linterKey": "REPOSITORY_TRIVY",
  "linterVersion": "0.43.1",
  "linterCliLintMode": "project",
  "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004",
  "docUrl": "https://megalinter.io/alpha/descriptors/repository_trivy",
  "isFormatter": false,
  "isSBOM": false,
  "outputSarif": {
    "$schema": "https://json.schemastore.org/sarif-2.1.0.json",
    "runs": [
      {
        "columnKind": "utf16CodeUnits",
        "originalUriBaseIds": {
          "ROOTPATH": {
            "uri": "file:///"
          }
        },
        "properties": {
          "megalinter": {
            "docUrl": "https://megalinter.io/alpha/descriptors/repository_trivy",
            "linterKey": "REPOSITORY_TRIVY",
            "linterVersion": "0.43.1"
          }
        },
        "results": [],
        "tool": {
          "driver": {
            "fullName": "Trivy Vulnerability Scanner",
            "informationUri": "https://github.com/aquasecurity/trivy",
            "name": "Trivy (MegaLinter REPOSITORY_TRIVY)",
            "rules": [],
            "version": "0.43.1"
          }
        }
      }
    ],
    "version": "2.1.0"
  }
}
```

### Complete MegaLinter analysis

This message is sent once by analysis, when a **MegaLinter analysis is completed**.

CodeTotal stops listening to the requestId pubsub channel once this message is received, as no new message will be sent through this channel.

Example of **megalinterComplete** messageType:

```json
{
  "messageType": "megalinterComplete",
  "megaLinterStatus": "completed",
  "requestId": "RQ_cbdd1d82-1e7b-11ee-9258-0242ac120004"
}
```

### MegaLinter server error

In some cases, it is not possible for MegaLinter to start an analysis because there has been an error during initialization.

In that case, CodeTotal stops listening to the pubsub channel, as no more messages will be sent.

List of errors:

- `missingAnalysisType`: Missing type (snippet, file or repository)
- `gitCloneError`: Unable to clone the repository (probably not existing or not reachable)
- `uploadedFileNotFound`: Unable to find file(s) that were supposed to be uploaded by a previous HTTP call to `/upload-file`
- `snippetGuessError`: Unable to automatically detect the language of a code snippet
- `snippetBuildError`: Unable to find a file extension for the guessed snipper language

Example of **serverError** messageType

```json
{
  "messageType": "serverError",
  "message": "Unable to clone repository\nCmd('git') failed due to: exit code(128)\n cmdline: git clone -v -- https://github.com/nvuillam/node-sarif-builder2 /tmp/ct-megalinter-x0afpmcmb\n stderr: 'Cloning into '/tmp/ct-megalinter-x0afpmcmb'...\nfatal: could not read Username for 'https://github.com': No such device or address\n'",
  "errorCode": "gitCloneError",
  "errorDetails": {
    "error": "Cmd('git') failed due to: exit code(128)\n cmdline: git clone -v -- https://github.com/nvuillam/node-sarif-builder2 /tmp/ct-megalinter-x0afpmcmb\n stderr: 'Cloning into '/tmp/ct-megalinter-x0afpmcmb'...\nfatal: could not read Username for 'https://github.com': No such device or address\n'"
  },
  "requestId": "RQ_e630c962-1e7c-11ee-9258-0242ac120004"
}
```

## Release Management

- Create a sub-branch `main` branch, name it release/vX.XX.XX (example: `release/v1.2.0`)

- Update CHANGELOG.md to add the section about the content of the new release. Leave empty the **beta** section, then commit.

- Run `npm version --no-git-tag-version --new-version vX.XX.XX` (example: `npm version --no-git-tag-version --new-version v1.2.0`)

- Commit updates on package.json and package-lock.json with message `release vX.XX.XX`

- Make a Pull Request to `main`. **IMPORTANT**: The PR title must contain `release` in lowercase. Example: `New release v1.2.0`.

- Merge the PR if everything is ok **(use Squash & Merge option)**, else perform linter fixes until jobs are green, then merge.

- Create a new GitHub Release -> <https://github.com/oxsecurity/codetotal/releases/new>

  - Input your new version tag string (ex: `v1.2.0`)
  - Name the release `CodeTotal vX.XX.XX` (ex: `CodeTotal v1.2.0`)
  - Click on Generate Release Notes button
  - Arrange the result with content of CHANGELOG.md if necessary (like breaking change instructions)
  - Create the GitHub release: An automated job will be triggered and will release the associated CodeTotal Docker Image

