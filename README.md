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

**GitHub Custom JavaScript Action** to check the available environments.

## Action Description

This GitHub Action provides a reusable composite workflow that sets up Python and interacts with the GitHub API to post a comment on an issue, including a link to a created branch.

---

## Inputs

| Name           | Description                                         | Required | Default        |
| -------------- |-----------------------------------------------------|----------|----------------|
| `token`        | GitHub token used for API authentication.           | Yes      | —              |

---

## Example Usage

```yaml
name: "Check Environments"

on:
  workflow_dispatch

jobs:
  check-envs:
    runs-on: ubuntu-26.04
    steps:
      - name: Check Environments
        id: check
        uses: subhamay-bhattacharyya-gha/check-environments-action@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Show Environment Status
        run: |
          echo "Environment status: ${{ steps.check.outputs.env_status }}"
```

## License

MIT
