# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] (beta, main branch content)

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
  - Replace nodemon by ts-node to run back-end in dev mode

## [v0.1.0] - 2023-08-07

- Initial public version
  - CodeTotal front-end
  - CodeTotal back-end
  - Ready to use docker-compose using CodeTotal and MegaLinter images
  - Online Documentation on <https://codetotal.io>
  - Contributing instructions

