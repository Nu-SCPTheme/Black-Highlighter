# Variables
CSS_SOURCES := $(wildcard src/css/*.css)
CSS_OUTPUTS := \
	dist/css/black-highlighter.css \
	dist/css/normalize.css \
	dist/css/min/black-highlighter.min.css \
	dist/css/min/normalize.min.css

# CSS rules
dist/css/black-highlighter.css: src/css/black-highlighter.css $(BUILD_SOURCES) $(CSS_SOURCES) node_modules	
	NODE_ENV=development npm run postcss -- $< --config build -o $@

dist/css/min/black-highlighter.min.css: dist/css/black-highlighter.css $(BUILD_SOURCES) $(CSS_SOURCES) node_modules
	NODE_ENV=production npm run postcss -- $< --config build -o $@

dist/css/normalize.css: src/css/normalize.css $(BUILD_SOURCES)
	NODE_ENV=development npm run postcss -- $< --config build -o $@

dist/css/min/normalize.min.css: dist/css/normalize.css node_modules
	NODE_ENV=production npm run postcss -- $< --config build -o $@
