#!/usr/bin/env bash
set -euo pipefail

# Bulk-toggle GitHub Actions at repository level.
# Works for both user-owned and org-owned repositories.
# Requires: GitHub CLI (gh) authenticated with a token that has admin rights on the repos.
# Scopes: repo, admin:repo_hook (for some cases)
#
# Usage examples:
#   ./toggle_actions_repos.sh enable-list bekalah tools/github/repos.txt
#   ./toggle_actions_repos.sh disable-list bekalah tools/github/repos.txt
#   ./toggle_actions_repos.sh enable-user-all bekalah   # fetches all repos for owner and enables
#   ./toggle_actions_repos.sh disable-user-all bekalah  # fetches all repos for owner and disables
#
# Notes:
# - For user accounts, there is no org-level policy; repo-level is the way to go.
# - For orgs, org-level policy is faster (see toggle_actions_org.sh), but this script still works.
# - Default workflow token permissions are set to "read" and cannot approve PRs by default.

MODE=${1:-}
OWNER=${2:-}
LIST_FILE=${3:-}

if ! command -v gh >/dev/null 2>&1; then
  echo "error: gh (GitHub CLI) is required. Install: https://cli.github.com/" >&2
  exit 1
fi

if [[ -z "$MODE" || -z "$OWNER" ]]; then
  echo "Usage: $0 <enable-list|disable-list|enable-user-all|disable-user-all> <owner> [repos_file]" >&2
  exit 1
fi

fetch_all_repos_for_owner() {
  local owner="$1"
  gh repo list "$owner" --limit 1000 --json nameWithOwner \
    -q '.[].nameWithOwner' | tr -d '\r'
}

normalize_repo_tuple() {
  local tuple="$1"
  if [[ "$tuple" == *"/"* ]]; then
    echo "$tuple"
  else
    echo "$OWNER/$tuple"
  fi
}

enable_repo_actions() {
  local full="$1"  # owner/repo
  local owner="${full%%/*}"
  local repo="${full##*/}"
  echo "Enabling Actions on $full"
  # Enable Actions and allow all actions
  gh api -X PUT -H "Accept: application/vnd.github+json" \
    "/repos/${owner}/${repo}/actions/permissions" \
    -F enabled=true \
    -f allowed_actions=all >/dev/null
  # Set default workflow token perms (read; cannot approve PR)
  gh api -X PUT -H "Accept: application/vnd.github+json" \
    "/repos/${owner}/${repo}/actions/permissions/workflow" \
    -f default_workflow_permissions=read \
    -F can_approve_pull_request_reviews=false >/dev/null
}

disable_repo_actions() {
  local full="$1"  # owner/repo
  local owner="${full%%/*}"
  local repo="${full##*/}"
  echo "Disabling Actions on $full"
  gh api -X PUT -H "Accept: application/vnd.github+json" \
    "/repos/${owner}/${repo}/actions/permissions" \
    -F enabled=false >/dev/null
}

case "$MODE" in
  enable-list|disable-list)
    if [[ -z "${LIST_FILE:-}" ]]; then
      echo "error: list mode requires a repos list file (owner/repo or repo per line)" >&2
      exit 1
    fi
    if [[ ! -f "$LIST_FILE" ]]; then
      echo "error: repos list file not found: $LIST_FILE" >&2
      exit 1
    fi
    mapfile -t REPOS < <(grep -v '^#' "$LIST_FILE" | grep -E '\S' | tr -d '\r')
    if [[ ${#REPOS[@]} -eq 0 ]]; then
      echo "error: no repositories found in list file" >&2
      exit 1
    fi
    for r in "${REPOS[@]}"; do
      full=$(normalize_repo_tuple "$r")
      if [[ "$MODE" == "enable-list" ]]; then
        enable_repo_actions "$full"
      else
        disable_repo_actions "$full"
      fi
    done
    echo "Done."
    ;;

  enable-user-all|disable-user-all)
    echo "Fetching repositories for owner '$OWNER'..."
    mapfile -t ALL < <(fetch_all_repos_for_owner "$OWNER")
    if [[ ${#ALL[@]} -eq 0 ]]; then
      echo "error: no repositories found for owner $OWNER" >&2
      exit 1
    fi
    for full in "${ALL[@]}"; do
      if [[ "$MODE" == "enable-user-all" ]]; then
        enable_repo_actions "$full"
      else
        disable_repo_actions "$full"
      fi
    done
    echo "Done."
    ;;

  *)
    echo "error: unknown mode '$MODE'" >&2
    exit 1
    ;;

esac
