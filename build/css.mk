# Variables
CSS_SOURCES := $(wildcard src/css/*.css)
CSS_OUTPUTS := \
	dist/css/min/black-highlighter.min.css \
	dist/css/min/normalize.min.css

# CSS rules
dist/css/black-highlighter.css: src/css/black-highlighter.css $(BUILD_SOURCES) $(CSS_SOURCES) node_modules
	npm run postcss -- --config build/css-merge -o $@ $<
	cat \
		src/css/black-highlighter-wrap-begin.css \
		$@ \
		src/css/black-highlighter-wrap-close.css \
			> $@_
	mv $@_ $@

dist/css/min/black-highlighter.min.css: dist/css/black-highlighter.css node_modules
	npm run postcss -- --config build/css-minify -o $@ $<

dist/css/normalize.css: src/css/normalize.css $(BUILD_SOURCES) src/css/normalize-wrap-begin.css src/css/normalize-wrap-close.css
	cat \
		src/css/normalize-wrap-begin.css \
		$< \
		src/css/normalize-wrap-close.css \
			> $@

dist/css/min/normalize.min.css: dist/css/normalize.css node_modules
	npm run postcss -- --config build/css-minify -o $@ $<
