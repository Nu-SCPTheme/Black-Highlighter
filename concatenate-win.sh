# concatenate.sh
# 
# For generating concatenated, minified, stable versions of nu-SCP.
#
# Requires: yui-compressor, java
# 
# 1. Takes all CSS files from /styles
# 2. Concatenates them
# 3. Saves this file to /stable/styles as black-highlighter.css
# 4. Minifies the file and saves it to /stable/styles as black-highlighter.min.css


# Define an error-handling function
# Parameters:
# 	1. Description of error
error() {
	echo $1 1>&2
	echo "Aborting"
	# Delete temp.css, if present
	rm temp.css
	exit
}

# First let's confirm that we're in /Black-Highlighter

echo "Validating directory..."
if [ "${PWD##*/}" != "Black-Highlighter" ]; then
	error "Script must be executed from black-highlighter root directory"
fi

# Take main.css and copy to a temp file
echo "Duplicating main.css..."
cp styles/main.css temp.css

# Scrap the @import rules
echo "Removing @imports..."
sed -i "/^@import.*\.css.*$/d" temp.css || error "@import removal failed"

# Append this file to root.css
echo "Prepending root.css..."
cat styles/root.css temp.css > temp && mv temp temp.css

# Then we concat all files *except* main.css,root.css
echo "Concatenating CSS..."
shopt -s extglob || error "Unable to extend pattern matching"
cat styles/!(main|root|header_ch|normalize|overwrite-main).css >> temp.css

# Wrap the whole thing in @supports for IE
echo "Supporting IE..."
sed -i '1 s/^/@supports(--css: variables) {\n/' temp.css
echo "}" >> temp.css

# Extract any imports rules to the top of the file
grep '^@import' temp.css > temp
grep -v '^@import' temp.css >> temp
mv temp temp.css

# Move temp.css
echo "Created black-highlighter.css"
cp temp.css stable/styles/black-highlighter.css

# Extract inline images to array
IFS='>'
IMAGES=($(awk -F '>' '/data:image/ && match($0,/\".*\"/){val=val?val ">" substr($0,RSTART+1,RLENGTH-2):substr($0,RSTART+1,RLENGTH-2)} END{print val}' temp.css))
echo "Found ${#IMAGES[@]} images to extract"
echo "Extracting images..."
count=0
for i in "${IMAGES[@]}"; do
	#echo "IMAGES[$count]=$i"
	sed -i -e "s>$i>!!MARKER$count>g" temp.css || error "Bad sed"
	count=$((count + 1))
done

# Minify
echo "Compressing..."
yuicompressor --type css -o temp.css temp.css

# Correct compression errors
# "-(" -> "- ("
sed -i -e "s/-(/- (/g" temp.css
# "or(" -> "or ("
sed -i -e "s/or(/or (/g" temp.css
# "Xrem+Yrem" -> "Xrem + Yrem"
sed -i -E "s/([\)mh%])(\+)([\(0-9v])/\1 + \3/g" temp.css

# Reinsert extracted images
echo "Reinserting extracted images..."
count=0
for i in "${IMAGES[@]}"; do
	sed -i -E "s>!!MARKER$count>$i>g" temp.css
	count=$((count + 1))
done

# Move the minified file to final destination
mv temp.css stable/styles/black-highlighter.min.css
echo "Created black-highlighter.min.css"

echo "Done."
