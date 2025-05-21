# GitHub Custom JavaScript Action - Check Environments Action

![Release](https://github.com/subhamay-bhattacharyya-gha/check-environments-action/actions/workflows/release.yaml/badge.svg)&nbsp;![Commit Activity](https://img.shields.io/github/commit-activity/t/subhamay-bhattacharyya-gha/check-environments-action)&nbsp;![Last Commit](https://img.shields.io/github/last-commit/subhamay-bhattacharyya-gha/check-environments-action)&nbsp;![Release Date](https://img.shields.io/github/release-date/subhamay-bhattacharyya-gha/check-environments-action)&nbsp;![Repo Size](https://img.shields.io/github/repo-size/subhamay-bhattacharyya-gha/check-environments-action)&nbsp;![File Count](https://img.shields.io/github/directory-file-count/subhamay-bhattacharyya-gha/check-environments-action)&nbsp;![Issues](https://img.shields.io/github/issues/subhamay-bhattacharyya-gha/check-environments-action)&nbsp;![Top Language](https://img.shields.io/github/languages/top/subhamay-bhattacharyya-gha/check-environments-action)&nbsp;![Monthly Commit Activity](https://img.shields.io/github/commit-activity/m/subhamay-bhattacharyya-gha/check-environments-action)&nbsp;![Custom Endpoint](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/bsubhamay/13d4f16507edd626bc564513fafaab01/raw/check-environments-action.json?)

**GitHub Custom JavaScript Action** to check the available environments.

## Action Description

This GitHub Action provides a reusable composite workflow that sets up Python and interacts with the GitHub API to post a comment on an issue, including a link to a created branch.

---

## Inputs

| Name           | Description                                         | Required | Default        |
|----------------|-----------------------------------------------------|----------|----------------|
| `token` | GitHub token used for API authentication.           | Yes      | —              |

---

## Example Usage

```yaml
name: "Check Environments"

on:
  workflow_dispatch

jobs:
  check-envs:
    runs-on: ubuntu-latest
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
