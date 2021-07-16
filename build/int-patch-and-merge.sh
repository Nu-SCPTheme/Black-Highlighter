#!/bin/bash
set -eu

# Usage: build/int-patch-and-merge.sh <lang>
# e.g. "cn", for the CN branch (see 'src/css/int/cn')
readonly lang="$1"

# Create temporary directory for intermediary files
tempdir="$(mktemp -d "/tmp/bhl-$lang-XXXXXXXXX")"
echo "+ Using temporary directory $tempdir"

# Setup auto cleanup
function on_exit() {
	echo "+ Removing temporary directory $tempdir"
	rm -rf "$tempdir"
}

trap on_exit EXIT SIGTERM SIGINT

# Copy and patch with branch changes
for path in src/css/*.css; do
	filename="${path##*/}"
	stem="${filename%.*}"

	# Copy file to temporary directory
	echo "+ Copying CSS source file $path"
	cp "$path" "$tempdir/$filename"

	# Modify if patch file exists
	patch="src/css/int/$lang/$stem.patch"
	if [[ -f $patch ]]; then
		echo "+ Patching $filename ($patch)"
		patch "$tempdir/$filename" "$patch"
	fi
done

mkdir "$tempdir/out"

# Merge CSS files
echo "+ Merging black-highlighter.css"
npm run postcss -- \
	--config build/css-merge \
	-o "$tempdir/out/black-highlighter_merged.css" \
	"$tempdir/black-highlighter.css"

echo "+ Merging normalize.css"
npm run postcss -- \
	--config build/css-merge \
	-o "$tempdir/out/normalize_merged.css" \
	"$tempdir/normalize.css"

# Wrap files
echo "+ Wrapping black-highlighter.css"
cat \
	"$tempdir/black-highlighter-wrap-begin.css" \
	"$tempdir/out/black-highlighter_merged.css" \
	"$tempdir/black-highlighter-wrap-close.css" \
		> "$tempdir/out/black-highlighter.css"

echo "+ Wrapping normalize.css"
cat \
	"$tempdir/normalize-wrap-begin.css" \
	"$tempdir/out/normalize_merged.css" \
	"$tempdir/normalize-wrap-close.css" \
		> "$tempdir/out/normalize.css"

# Export finished files
echo "+ Exporting black-highlighter.css"
build/install.sh 644 "$tempdir/out/black-highlighter.css" "dist/css/int/$lang/black-highlighter.css"

echo "+ Exporting normalize.css"
build/install.sh 644 "$tempdir/out/normalize.css" "dist/css/int/$lang/normalize.css"
