# Variables
BUILD_SOURCES := \
	cssnano.config.js

# Directory creation
DIRECTORIES := \
	dist/css/min/ \
	dist/fonts/ \
	dist/fonts/int \
	dist/fonts/int/chinese-simplified \
	dist/fonts/int/chinese-traditional \
	dist/fonts/int/japanese \
	dist/fonts/int/korean \
	dist/fonts/int/thai-vietnamese \
	dist/img/ \
	dist/img/page-toolbar-icons \
	dist/img/text-editor-icons \
	dist/img/social-icons \
	dist/stable/styles/

$(DIRECTORIES):
	mkdir -p $@

# npm rules
node_modules: package.json package-lock.json
	npm install
	touch node_modules
