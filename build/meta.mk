# Variables
BUILD_SOURCES := \
	$(wildcard build/**/*) \
	cssnano.config.js

# Directory creation
DIRECTORIES := \
	dist/css/min/ \
	dist/fonts/ \
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
