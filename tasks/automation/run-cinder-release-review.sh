#!/bin/bash
set -euo pipefail

export HOME="/Users/seren"
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

ROOT="/Users/seren/workspace/poong-game"
TASK_DIR="$ROOT/tasks/automation"
LOG_DIR="/Users/seren/.local/state/cinder-circuit-automation"
LOCK_DIR="$TASK_DIR/.release-review.lock"
CRITIQUE_LOCK_DIR="$TASK_DIR/.critique.lock"
IMPROVE_LOCK_DIR="$TASK_DIR/.improve.lock"
CODEX_BIN="/usr/local/bin/codex"
PROMPT_FILE="$TASK_DIR/cinder-circuit-release-review-prompt.md"
LAST_FILE="$LOG_DIR/release-review-last.txt"
LOG_FILE="$LOG_DIR/release-review.log"
WEBHOOK_URL="https://discordapp.com/api/webhooks/1484556495533248802/YWP20Wt-tOoPs9mKEHNM6e7Qm4BPAYOXDMVSgd_HNHIYcoZ4QpEl-wqKargyN-iB1hCl"
COMPACT_LOOP_BIN="$TASK_DIR/compact-cinder-loop.py"

mkdir -p "$LOG_DIR"

if [ -d "$CRITIQUE_LOCK_DIR" ] || [ -d "$IMPROVE_LOCK_DIR" ]; then
  exit 0
fi

if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  exit 0
fi

cleanup() {
  rmdir "$LOCK_DIR"
}
trap cleanup EXIT

notify() {
  local status="$1"
  local text="$2"
  /usr/bin/curl -sS -H "Content-Type: application/json" -X POST \
    -d "{\"content\":\"[Cinder Release Review][$status] $text\"}" \
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

on_error() {
  notify "error" "루프 실패"
}
trap on_error ERR

{
  printf '\n[%s] release-review start\n' "$(date '+%Y-%m-%d %H:%M:%S')"
  notify "start" "루프 시작"
  cat "$PROMPT_FILE" | "$CODEX_BIN" exec --full-auto -C "$ROOT" -o "$LAST_FILE" -
  /usr/bin/python3 "$COMPACT_LOOP_BIN"
  printf '[%s] release-review done\n' "$(date '+%Y-%m-%d %H:%M:%S')"
  notify "done" "$(summary_text)"
} >> "$LOG_FILE" 2>&1
