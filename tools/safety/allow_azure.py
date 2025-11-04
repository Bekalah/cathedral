"""Small repo-level guard to require explicit opt-in for Azure usage.

Usage: from tools.safety.allow_azure import azure_allowed

Azure will be allowed only when one of the following is present:
 - Environment variable ALLOW_AZURE set to '1','true','yes', or 'on'
 - A file named `.allow_azure` present in the repository root

This prevents accidental paid API usage and keeps the default safe.
"""
import os


def azure_allowed() -> bool:
    v = os.getenv("ALLOW_AZURE", "").strip().lower()
    if v in ("1", "true", "yes", "on"):
        return True

    # Allow a repository marker file as an explicit opt-in
    repo_marker = os.path.join(os.getcwd(), ".allow_azure")
    if os.path.exists(repo_marker):
        return True

    return False
