# stabilize.sh
# 
# For generating concatenated, minified, stable version of nu-SCP.
#
# Requires yui-compressor
# 
# 1. Takes all CSS files from /styles
# 2. Concatenates them
# 3. Saves this file to /stable/styles as nuscp.css
# 4. Minifies the file and saves it to /stable/styles as nuscp.min.css
