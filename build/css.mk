# Variables
CSS_SOURCES := $(wildcard src/css/*.css)
CSS_OUTPUTS := \
	dist/css/min/black-highlighter.min.css \
	dist/css/min/normalize.min.css

# CSS rules
dist/css/black-highlighter.css: src/css/black-highlighter.css $(BUILD_SOURCES) $(CSS_SOURCES) node_modules
	npm run postcss -- --config build -o $@ $<

dist/css/min/black-highlighter.min.css: dist/css/black-highlighter.css node_modules
	npm run postcss -- --no-map --use cssnano -o $@ $<
	build/sed.sh 's|\.\./fonts/fonts\.css|../../fonts/fonts.css|' $@

dist/css/normalize.css: src/css/normalize.css $(BUILD_SOURCES)
	cp -f $< $@

dist/css/min/normalize.min.css: dist/css/normalize.css node_modules
	npm run postcss -- --no-map --use cssnano -o $@ $<
