# Merge Guide – Safely Integrate External Work into `main`

This guide shows how to bring in commits from another repository or remote branch into this repo without risking `main`.

## 0) Prep

- Ensure your local worktree is clean: `git status` should show no changes.
- Make sure `main` is up to date: `git fetch origin && git switch main && git pull --ff-only`.

## 1) Add the source as a remote (example)

Replace URL and name with your actual source. Avoid force‑pushing over history.

```bash
# Add remote once
git remote add external https://github.com/OWNER/OTHER-REPO.git

# Fetch its branches
git fetch external
```

## 2) Create an integration branch

```bash
git switch -c integrate/external-main origin/main
```

## 3) Merge the source branch into the integration branch

```bash
# Example merges external/main into your integrate branch
git merge external/main
```

Resolve conflicts, commit the merge, and keep large/binary exports out of history.

Tip: If the source contains >100MB files in history, consider filtering them out before merging (e.g., `git filter-repo`).

## 4) Validate locally

Run the quick validation script (see `POST_MERGE_VALIDATION.sh`), which builds the web app and runs Python smoketests if available.

```bash
./POST_MERGE_VALIDATION.sh
```

## 5) Push and open a PR

```bash
git push -u origin integrate/external-main
```

Open a pull request from `integrate/external-main` into `main` and review the diff.

## Notes

- Do not set your home directory as a Git repo (prevents massive untracked noise in editors).
- Keep artifacts and exports out of Git; use `.gitignore` wisely.
- If you see deploy failures, check the CI logs (GitHub Actions) and the deployment provider dashboard.
