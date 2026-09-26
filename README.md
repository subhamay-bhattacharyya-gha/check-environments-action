# GitHub JavaScript Action - Check Environments Action

<!-- Row 1: Status - Most Important -->
[![Release](https://github.com/subhamay-bhattacharyya-gha/check-environments-action/actions/workflows/release.yaml/badge.svg)](https://github.com/subhamay-bhattacharyya-gha/check-environments-action)&nbsp;[![GitHub Action](https://img.shields.io/badge/GitHub-Action-blue?logo=github)](https://github.com/subhamay-bhattacharyya-gha/check-environments-action)&nbsp;[![Issues](https://img.shields.io/github/issues/subhamay-bhattacharyya-gha/check-environments-action)](https://github.com/subhamay-bhattacharyya-gha/check-environments-action/issues)&nbsp;[![Last Commit](https://img.shields.io/github/last-commit/subhamay-bhattacharyya-gha/check-environments-action)](https://github.com/subhamay-bhattacharyya-gha/check-environments-action/commits)

<!-- Row 2: Code Quality -->
[![Top Language](https://img.shields.io/github/languages/top/subhamay-bhattacharyya-gha/check-environments-action)](https://github.com/subhamay-bhattacharyya-gha/check-environments-action)&nbsp;[![Commits](https://img.shields.io/github/commit-activity/t/subhamay-bhattacharyya-gha/check-environments-action)](https://github.com/subhamay-bhattacharyya-gha/check-environments-action/commits)

<!-- Row 3: Tech Stack -->
[![Built with Claude Code](https://img.shields.io/badge/Built_with-Claude_Code-D97757?logo=anthropic&logoColor=white)](https://claude.ai/)

<!-- Row 4: Repository Info -->
[![Files](https://img.shields.io/github/directory-file-count/subhamay-bhattacharyya-gha/check-environments-action)](https://github.com/subhamay-bhattacharyya-gha/check-environments-action)&nbsp;[![Repo Size](https://img.shields.io/github/repo-size/subhamay-bhattacharyya-gha/check-environments-action)](https://github.com/subhamay-bhattacharyya-gha/check-environments-action)&nbsp;[![Release Date](https://img.shields.io/github/release-date/subhamay-bhattacharyya-gha/check-environments-action)](https://github.com/subhamay-bhattacharyya-gha/check-environments-action/releases)

<!-- Row 5: Custom Metrics -->
[![Custom Endpoint](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/bsubhamay/13d4f16507edd626bc564513fafaab01/raw/check-environments-action.json?)](https://gist.github.com/bsubhamay/13d4f16507edd626bc564513fafaab01)

**GitHub Custom JavaScript Action** to check if required environments exist in your repository.

## Action Description

This GitHub Action checks the existence of required deployment environments in your repository. It verifies that the `ci` and `devl` environments are configured, while optionally checking for `test` and `prod` environments. The action will fail if any required environments are missing.

---

## Inputs

| Name             | Description                                         | Required | Default        |
| ---------------- |-----------------------------------------------------|----------|----------------|
| `github-token`   | GitHub token used for API authentication.           | Yes      | —              |

## Environments Checked

| Environment | Status   | Purpose                          |
| ----------- |----------|----------------------------------|
| `ci`        | Required | Continuous Integration           |
| `devl`      | Required | Development                      |
| `test`      | Optional | Testing                          |
| `prod`      | Optional | Production                       |

---

## Example Usage

```yaml
name: "Check Environments"

on:
  push:
    branches: [main]

jobs:
  check-environments:
    name: Check Required Environments
    runs-on: ubuntu-26.04
    steps:
      - uses: actions/checkout@v7.0.1
      
      - name: Check Environments
        id: check
        uses: subhamay-bhattacharyya-gha/check-environments-action@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}

      - name: Show Environment Status
        run: |
          echo "Environment status: ${{ steps.check.outputs.env_status }}"
```

## Outputs

| Name         | Description                                                    |
| ------------ |----------------------------------------------------------------|
| `env_status` | JSON object containing the status of each environment checked. |

## Exit Behavior

- **Success**: All required environments (`ci` and `devl`) exist.
- **Failure**: One or more required environments are missing.

The action will generate a job summary showing the status of all environments (both required and optional).

## License

MIT
