#!/bin/bash
set -eu

# Version of "sed -i" which works even if the standalone -i option isn't supported.

if [[ $# -ne 2 ]]; then
	echo >&2 "Usage: $0 <pattern> <file>"
	exit 1
fi

# Arguments
pattern="$1"
file="$2"

# Temporary file
temp="$(mktemp /tmp/bhl-XXXXXXXXX)"

on_exit() {
	rm -f "$temp"
}

trap on_exit EXIT SIGTERM SIGINT

# Execution
sed "$pattern" "$file" > "$temp"
mv "$temp" "$file"
