# Variables
BUILD_SOURCES := \
	$(wildcard build/**/*) \
	cssnano.config.js

# Directory creation
DIRECTORIES := \
	dist/css/min/ \
	dist/fonts/ \
	dist/img/ \
	dist/stable/styles/

$(DIRECTORIES):
	mkdir -p $@

# npm rules
node_modules: package.json package-lock.json
	npm install
	touch node_modules
