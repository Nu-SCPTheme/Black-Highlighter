# CN - Chinese Branch
INT_SOURCES_CN := $(wildcard src/css/int/cn/*.patch)
INT_OUTPUTS_CN := \
	dist/css/int/cn/black-highlighter.css \
	dist/css/int/cn/normalize.css \
	dist/css/int/cn/min/black-highlighter.min.css \
	dist/css/int/cn/min/normalize.min.css

dist/css/int/cn/black-highlighter.css dist/css/int/cn/normalize.css: $(INT_SOURCES_CN)
	build/int-patch-and-merge.sh cn

dist/css/int/cn/min/black-highlighter.min.css: dist/css/int/cn/black-highlighter.css
	npm run postcss -- --config build/css-minify -o $@ $<

dist/css/int/cn/min/normalize.min.css: dist/css/int/cn/normalize.css
	npm run postcss -- --config build/css-minify -o $@ $<
