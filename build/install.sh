#!/bin/bash
set -eu

# Version of "install -D -mXXX" which works even if the -D option isn't supported.

if [[ $# -ne 3 ]]; then
	echo >&2 "Usage: $0 <mode> <source> <dest>"
	exit 1
fi

# Arguments
mode="$1"
src="$2"
dest="$3"

# Derived values
directory="${dest%/*}"

mkdir -p "$directory"
install -m"$mode" "$src" "$dest"
