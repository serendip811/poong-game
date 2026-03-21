#!/bin/bash
set -euo pipefail

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

ROOT="/Users/seren/workspace/poong-game"
TASK_DIR="$ROOT/tasks/automation"
LOG_DIR="/Users/seren/.local/state/cinder-circuit-automation"
LOCK_DIR="$TASK_DIR/.improve.lock"
CRITIQUE_LOCK_DIR="$TASK_DIR/.critique.lock"
CODEX_BIN="/usr/local/bin/codex"
PROMPT_FILE="$TASK_DIR/cinder-circuit-improve-prompt.md"
LAST_FILE="$LOG_DIR/improve-last.txt"
LOG_FILE="$LOG_DIR/improve.log"
WEBHOOK_URL="https://discordapp.com/api/webhooks/1484556495533248802/YWP20Wt-tOoPs9mKEHNM6e7Qm4BPAYOXDMVSgd_HNHIYcoZ4QpEl-wqKargyN-iB1hCl"

mkdir -p "$LOG_DIR"

if [ -d "$CRITIQUE_LOCK_DIR" ]; then
  exit 0
fi

if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  exit 0
fi

cleanup() {
  rmdir "$LOCK_DIR"
}
trap cleanup EXIT

on_error() {
  notify "error" "loop failed"
}
trap on_error ERR

notify() {
  local status="$1"
  local text="$2"
  /usr/bin/curl -sS -H "Content-Type: application/json" -X POST \
    -d "{\"content\":\"[Cinder Improve][$status] $text\"}" \
    "$WEBHOOK_URL" >/dev/null || true
}

summary_text() {
  if [ -f "$LAST_FILE" ]; then
    /usr/bin/python3 - <<'PY' "$LAST_FILE"
from pathlib import Path
import sys
text = Path(sys.argv[1]).read_text().strip().splitlines()
lines = [line.strip() for line in text if line.strip()][:2]
print(" | ".join(lines)[:500])
PY
  fi
}

{
  printf '\n[%s] improve start\n' "$(date '+%Y-%m-%d %H:%M:%S')"
  notify "start" "loop started"
  cat "$PROMPT_FILE" | "$CODEX_BIN" exec --dangerously-bypass-approvals-and-sandbox -C "$ROOT" -o "$LAST_FILE" -
  printf '[%s] improve done\n' "$(date '+%Y-%m-%d %H:%M:%S')"
  notify "done" "$(summary_text)"
} >> "$LOG_FILE" 2>&1
