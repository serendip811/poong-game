#!/usr/bin/env python3
from pathlib import Path

ROOT = Path('/Users/seren/workspace/poong-game')
LOOP = ROOT / 'tasks/automation/cinder-circuit-loop.md'

KEEP_LIMITS = {
    '## Latest Critique': 12,
    '## Latest Release Review': 8,
    '## Latest Improvement': 12,
}


def split_sections(lines):
    sections = []
    current_header = None
    current_lines = []
    for line in lines:
      if line.startswith('## '):
            if current_header is not None:
                sections.append((current_header, current_lines))
            current_header = line
            current_lines = []
      else:
            current_lines.append(line)
    if current_header is not None:
        sections.append((current_header, current_lines))
    return sections


def trim_bullets(lines, keep):
    entries = []
    current = []
    for line in lines:
        if line.startswith('- '):
            if current:
                entries.append(current)
            current = [line]
        else:
            if current:
                current.append(line)
            else:
                entries.append([line])
                current = []
    if current:
        entries.append(current)

    bullet_entries = [entry for entry in entries if entry and entry[0].startswith('- ')]
    non_bullets = [entry for entry in entries if not (entry and entry[0].startswith('- '))]

    kept = bullet_entries[:keep]
    trimmed_count = max(0, len(bullet_entries) - keep)
    out = []
    for entry in kept:
        out.extend(entry)
    if trimmed_count:
        if out and out[-1] != '':
            out.append('')
        out.append(f'- Older entries trimmed automatically: {trimmed_count}')
    for entry in non_bullets:
        if entry == [''] and out and out[-1] == '':
            continue
        out.extend(entry)
    while len(out) > 1 and out[-1] == '' and out[-2] == '':
        out.pop()
    return out


def main():
    lines = LOOP.read_text().splitlines()
    prefix = []
    idx = 0
    while idx < len(lines) and not lines[idx].startswith('## '):
        prefix.append(lines[idx])
        idx += 1
    sections = split_sections(lines[idx:])
    out = list(prefix)
    for header, body in sections:
        if out and out[-1] != '':
            out.append('')
        out.append(header)
        trimmed = trim_bullets(body, KEEP_LIMITS[header]) if header in KEEP_LIMITS else body
        if trimmed and trimmed[0] != '':
            out.append('')
        out.extend(trimmed)
    LOOP.write_text('\n'.join(out).rstrip() + '\n')


if __name__ == '__main__':
    main()
