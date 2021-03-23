# Variables
BUILD_SOURCES := \
	$(wildcard build/**/*) \
	cssnano.config.js

# Directory creation
dist/%/:
	mkdir -p $@

# npm rules
node_modules: package.json package-lock.json
	npm install
	touch node_modules
