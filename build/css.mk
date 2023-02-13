# Variables
CSS_SOURCES := $(wildcard src/css/*.css)
CSS_OUTPUTS := \
	dist/css/min/black-highlighter.min.css \
	dist/css/min/normalize.min.css

# CSS rules
dist/css/black-highlighter.css: src/css/black-highlighter.css $(BUILD_SOURCES) $(CSS_SOURCES) node_modules
	npm run postcss -- $< --config build --env development -o $@

dist/css/min/black-highlighter.min.css: src/css/black-highlighter.css node_modules
	npm run postcss -- $< --config build --env production -o $@

dist/css/normalize.css: src/css/normalize.css $(BUILD_SOURCES) node_modules
	npm run postcss -- $< --config build --env development -o $@

dist/css/min/normalize.min.css: dist/css/normalize.css node_modules
	npm run postcss -- $< --config build --env production -o $@
