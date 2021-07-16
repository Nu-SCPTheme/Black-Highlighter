# TEST - Sample / Test of INT capabilities
INT_SOURCES_TEST := $(wildcard src/css/int/test/*.patch)
INT_OUTPUTS_TEST := \
	dist/css/int/test/ \
	dist/css/int/test/black-highlighter.css \
	dist/css/int/test/normalize.css \
	dist/css/int/test/min/black-highlighter.min.css \
	dist/css/int/test/min/normalize.min.css

dist/css/int/test/:
	mkdir -p $@

dist/css/int/test/black-highlighter.css dist/css/int/test/normalize.css: $(INT_SOURCES_TEST)
	build/int-patch-and-merge.sh test

dist/css/int/test/min/black-highlighter.min.css: dist/css/int/test/black-highlighter.css
	npm run postcss -- --config build/css-minify -o $@ $<

dist/css/int/test/min/normalize.min.css: dist/css/int/test/normalize.css
	npm run postcss -- --config build/css-minify -o $@ $<
