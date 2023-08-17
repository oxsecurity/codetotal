# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] (beta, main branch content)

_Can be run using `npm run codetotal:beta`_

- Global

- Front-end
  - Add language label
  - Add missing icon for Java
  - Show language only if it's available
  - Detect language for file analysis
  - Change score to risk
  - Remove auto focus from analysis tabs
  - Add auto focus to snippet & repo inputs
  - Highlight resource type in report header
  - Add a button in report toolbar to show code for snippet & file analysis
  - Add a report progress bar
  - Optimize new analysis dialog, drawer and linters list components' renders
  - Fix completed report receiving updates from ongoing analysis
  - Display "snippet" in results page instead of md5: xxxx
  
- Back-End
  - Bug fix: SBOM packages not showing up in report page. Async parsing of packages information in SBOM module
  - Retry calls to pypi or npm in case first attempts are failing
  - Increase unit test coverage #88
  - Fetch SBOM packages with concurrency of 10
  - Fix issue when there is no SBOM package info
  - SBOM results: Remove duplicate packages and sort them alphabetically (as a second criteria, after severity)
  - Allow to override parallel number of SBOM packages fetches using env var CODETOTAL_SBOM_FETCH_PARALLEL_NB (default is now 30)

## [v0.5.0] - 2023-08-10

- Global
  - Add animations to documentation - Refactor animations with black mode & linter icons
  - Add Google Tag Id for online doc

- Front-end
  - Add linters logos

## [v0.4.0] - 2023-08-09

- Global

  - Use latest version for production mode (by default), or beta version of MegaLinter to run CodeTotal in development mode
  - Documentation of docker-compose variables
  - docker-compose new variable: `REPOSITORY_TRUFFLEHOG_COMMAND_REMOVE_ARGUMENTS=--only-verified`
  - Badges in README

## [v0.3.0] - 2023-08-09

- Global
  - Doc: display linter icons

- Front-end
  - Fix error page styles and apply the fallback error page to all routes

## [v0.2.0] - 2023-08-09

- Global

  - Use `latest` codetotal-server docker image in production docker-compose.yml
  - Deploy online doc when any markdown file is updated
  - Factorize docker-compose
    - `npm run codetotal` runs latest release of CodeTotal and beta version MegaLinter (in the future it will be latest)
    - `npm run codetotal:beta` runs beta version of CodeTotal and MegaLinter
    - `npm run codetotal:dev` locally builds CodeTotal then runs it with beta version of MegaLinter

- Front-end

  - Language selection in snippet analysis form
  - Language name added next to the icon in report header
  - "CodeTotal" text added to the footer

- Back-End
  - Add SBOM management for NPM packages
    - SBOM info failure management
  - Replace nodemon by ts-node to run back-end in dev mode

## [v0.1.0] - 2023-08-07

- Initial public version
  - CodeTotal front-end
  - CodeTotal back-end
  - Ready to use docker-compose using CodeTotal and MegaLinter images
  - Online Documentation on <https://codetotal.io>
  - Contributing instructions
