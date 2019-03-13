#!/usr/bin/bash

# For generating concatenating and minified versions of nu-SCP for release.
#
# Requires: yui-compressor, java
#
# 1. Takes all CSS files from /styles
# 2. Concatenates them
# 3. Saves the file to /stable/styles as nuscp.css
# 4. Minifies the file and saves it to /stable/styles as nuscp.min.css

# Fail on errors, undefined variables, and broken pipes
set -eu -o pipefail

# Extended globbing
shopt -s extglob

# Helper functions
error() {
	echo "Error: $1" >&2
	exit 1
}

# Tempfiles
readonly out="$(mktemp /tmp/nuscp-XXXXXX)"
readonly temp="$(mktemp /tmp/nuscp-XXXXXX)"

on_exit() {
	rm -f "$out" "$temp"
}

trap on_exit EXIT

if ! which yuicompressor 2>/dev/null; then
	error 'No yuicompressor found'
fi

# Multiplatform sed
case "$(sed --help 2>&1)" in
	*GNU*) use_gnu=true ;;
	*) use_gnu=false ;;
esac

subst() {
	if "$use_gnu"; then
		sed -i "$@"
	else
		sed -i '' "$@"
	fi
}

# Main execution
echo 'Checking directory ...'
if [[ ! -d "$PWD/.git" ]]; then
	error 'Script must be executed from the nuscp root directory'
fi

echo 'Duplicating main.css ...'
cp styles/main.css "$out"

echo 'Removing @imports ...'
subst '/^import.*\.css.*$/d' "$out"

echo 'Concatenating CSS ...'
cat styles/root.css styles/!(main|root|normalize|overwrite-main).css > "$temp"
mv "$temp" "$out"

echo 'Add IE support ...'
subst '1 s/^/@supports(--css: variables) {\n/' "$out"
echo '}' >> "$out"

echo 'Extract any import rules to the top of the file ...'
grep '^@import' "$out" > "$temp"
grep -v '^@import' "$out" >> "$temp"
mv "$temp" "$out"

echo 'Created nuscp.css'
install -m644 "$out" stable/styles/nuscp.css

# Extract inline images to array
IFS='>'
images=($(
	awk -F '>' '/data:image/ && match($0,/\".*\"/){val=val?val ">" substr($0,RSTART+1,RLENGTH-2):substr($0,RSTART+1,RLENGTH-2)} END{print val}' "$out"
))

echo "Found ${images[@]} images to extract ..."
idx=0
for img in "${images[@]}"; do
	subst -e "s>$img>!!MARKER$idx>g" "$out"
	((idx++))
done

echo 'Minifying source files ...'
yuicompressor --type css -o "$out" "$out"

# Correct compression errors
subst \
	-e 's/-(/- (/g' \
	-e 's/or(/or (/g' \
	-e 's/\([)mh]\)\(\+\)\([(0-9v]\)/\1 + \3/g' \
	"$out"

echo 'Reinserting extracted images ...'
idx=0
for img in "${images[@]}"; do
	subst -E "s>!!MARKER$idx>$img>g" "$out"
	((idx++))
done

install -m644 "$out" stable/styles/nuscp.min.css
echo 'Done!'
