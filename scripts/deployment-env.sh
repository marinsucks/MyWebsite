#!/usr/bin/env bash
# Values arrive through the workflow environment, never through shell interpolation.
set -euo pipefail

required=(DOMAIN EMAIL RESEND_API_KEY TURNSTILE_SITE_KEY TURNSTILE_SECRET_KEY)
invalid=0
for key in "${required[@]}"; do
  value=${!key:-}
  if [[ -z "$value" ]]; then
    echo "::error::Missing GitHub Actions setting: $key"
    invalid=1
  fi
  # Single-quoted values work with both Docker Compose and the Makefile's shell.
  if [[ "$value" == *"'"* || "$value" == *$'\n'* || "$value" == *$'\r'* ]]; then
    echo "::error::Invalid quote or newline in GitHub Actions setting: $key"
    invalid=1
  fi
done
if (( invalid )); then exit 1; fi

case "${1:-}" in
  --check) exit 0 ;;
  --write) ;;
  *) echo 'Usage: deployment-env.sh --check|--write' >&2; exit 1 ;;
esac

umask 077
temporary=$(mktemp .env.deploy.XXXXXX)
trap 'rm -f -- "$temporary"' EXIT
for key in "${required[@]}"; do
  printf "%s='%s'\n" "$key" "${!key:-}" >> "$temporary"
done
mv -f -- "$temporary" .env
echo 'Deployment .env generated with owner-only permissions.'
