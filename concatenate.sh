# concatenate.sh
# 
# For generating concatenated, minified, stable versions of nu-SCP.
#
# Requires: yui-compressor, java
# 
# 1. Takes all CSS files from /styles
# 2. Concatenates them
# 3. Saves this file to /stable/styles as nuscp.css
# 4. Minifies the file and saves it to /stable/styles as nuscp.min.css


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

# First let's confirm that we're in /Nu-SCP

echo "Validating directory..."
if [ "${PWD##*/}" != "Nu-SCP" ]; then
	error "Script must be executed from nuscp root directory"
fi

# Take main.css and copy to a temp file
echo "Duplicating main.css..."
cp styles/main.css temp.css

# Scrap the @import rules
echo "Removing @imports..."
sed -i '/^@import.*\.css.*$/d' temp.css || error "@import removal failed"

# Append this file to root.css
echo "Prepending root.css..."
cat styles/root.css temp.css > temp && mv temp temp.css

# Then we concat all files *except* main.css,root.css
echo "Concatenating CSS..."
shopt -s extglob || error "Unable to extend pattern matching"
cat styles/!(main|root|normalize|overwrite-main).css >> temp.css

# Move temp.css
echo "Created nuscp.css"
cp temp.css stable/styles/nuscp.css

# Minify
echo "Compressing..."
yui-compressor --type css -o temp.css temp.css

# Correct compression errors
# "-(" -> "- ("
sed -i -e 's/-(/- (/g' temp.css
# "Xrem+Yrem" -> "Xrem + Yrem"
sed -i -E 's/(calc\([^\+]*?\S)(\+)(\S[^\+]*?\)[;|}])/\1 + \3/g' temp.css

# Move the minified file to final destination
mv temp.css stable/styles/nuscp.min.css
echo "Created nuscp.min.css"

echo "Done."