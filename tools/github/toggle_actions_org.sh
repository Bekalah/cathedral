#!/usr/bin/env bash
set -euo pipefail

# Bulk-toggle GitHub Actions at org level (all repos or selected set)
# Requires: GitHub CLI (gh) authenticated with an org owner/admin token.
# Scopes: admin:org, repo (for some repo queries)
# Usage examples:
#   ./toggle_actions_org.sh enable-all  bekalah
#   ./toggle_actions_org.sh disable-all bekalah
#   ./toggle_actions_org.sh selected    bekalah tools/github/repos.txt
#
# Behavior:
#   - enable-all: enables Actions for all repos in the org and allows all actions
#   - disable-all: disables Actions for all repos in the org
#   - selected: enables Actions only for the repos listed in repos.txt (owner/repo lines)
#               and sets org setting to "selected". Other repos will have Actions disabled by policy.
#
# Notes:
#   - This toggles the org-level Actions policy. If your org enforces more restrictive policies,
#     ensure you have proper permissions. For enterprise-managed orgs, you may need enterprise-level
#     changes.
#   - Workflow token permissions (read/write) are not changed here; default remains "read".
#     You can adjust later per org or per repo as needed.

MODE=${1:-}
ORG=${2:-}
LIST_FILE=${3:-}

if ! command -v gh >/dev/null 2>&1; then
  echo "error: gh (GitHub CLI) is required. Install: https://cli.github.com/" >&2
  exit 1
fi

if [[ -z "$MODE" || -z "$ORG" ]]; then
  echo "Usage: $0 <enable-all|disable-all|selected> <org> [repos_file]" >&2
  exit 1
fi

# Helper: set default workflow permissions at org (read, no PR approval)
set_workflow_defaults() {
  gh api \
    -X PUT \
    -H "Accept: application/vnd.github+json" \
    "/orgs/${ORG}/actions/permissions/workflow" \
    -f default_workflow_permissions=read \
    -F can_approve_pull_request_reviews=false \
    >/dev/null
}

case "$MODE" in
  enable-all)
    echo "Enabling Actions for ALL repositories in org '${ORG}' and allowing all actions..."
    gh api \
      -X PUT \
      -H "Accept: application/vnd.github+json" \
      "/orgs/${ORG}/actions/permissions" \
      -f enabled_repositories=all \
      -f allowed_actions=all \
      >/dev/null
    set_workflow_defaults
    echo "Done."
    ;;

  disable-all)
    echo "Disabling Actions for ALL repositories in org '${ORG}'..."
    gh api \
      -X PUT \
      -H "Accept: application/vnd.github+json" \
      "/orgs/${ORG}/actions/permissions" \
      -f enabled_repositories=none \
      >/dev/null
    echo "Done."
    ;;

  selected)
    if [[ -z "$LIST_FILE" ]]; then
      echo "error: selected mode requires a repos list file (owner/repo per line)" >&2
      exit 1
    fi
    if [[ ! -f "$LIST_FILE" ]]; then
      echo "error: repos list file not found: $LIST_FILE" >&2
      exit 1
    fi

    echo "Resolving repository IDs for selected list in '$LIST_FILE'..."
    mapfile -t REPOS < <(grep -v '^#' "$LIST_FILE" | grep -E '\S' | tr -d '\r')
    if [[ ${#REPOS[@]} -eq 0 ]]; then
      echo "error: no repositories found in list file" >&2
      exit 1
    fi

    IDS=()
    for full in "${REPOS[@]}"; do
      # Accept formats: owner/repo or just repo (assume same org)
      if [[ "$full" == *"/"* ]]; then
        owner="${full%%/*}"
        repo="${full##*/}"
      else
        owner="$ORG"
        repo="$full"
      fi
      # Fetch repo to get ID
      id=$(gh api -H "Accept: application/vnd.github+json" \
        "/repos/${owner}/${repo}" | \
        awk -F '"' '/"id":/ {print $4; exit}')
      if [[ -z "$id" ]]; then
        echo "warning: could not resolve id for ${owner}/${repo}, skipping" >&2
        continue
      fi
      IDS+=("$id")
    done

    if [[ ${#IDS[@]} -eq 0 ]]; then
      echo "error: no valid repository IDs resolved" >&2
      exit 1
    fi

    # Build JSON payload for selected repo IDs
    json='{"selected_repository_ids":['
    first=1
    for id in "${IDS[@]}"; do
      if [[ $first -eq 1 ]]; then
        json+="$id"
        first=0
      else
        json+=",$id"
      fi
    done
    json+=']}'

    echo "Setting org actions policy to 'selected' and applying repo allowlist (${#IDS[@]} repos)..."
    gh api -X PUT -H "Accept: application/vnd.github+json" \
      "/orgs/${ORG}/actions/permissions" \
      -f enabled_repositories=selected \
      >/dev/null

    echo "$json" | gh api -X PUT \
      -H "Accept: application/vnd.github+json" \
      -H "Content-Type: application/json" \
      "/orgs/${ORG}/actions/permissions/repositories" \
      --input - >/dev/null

    set_workflow_defaults
    echo "Done."
    ;;

  *)
    echo "error: unknown mode '$MODE' (use enable-all|disable-all|selected)" >&2
    exit 1
    ;;

esac
