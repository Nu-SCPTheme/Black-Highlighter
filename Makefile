MAKEFLAGS += --no-builtin-rules
.SUFFIXES:

.PHONY: default
.PHONY: images css css-int files legacy
.PHONY: clean

include build/meta.mk
include build/css.mk
include build/images.mk
include build/files.mk
include build/int.mk
include build/legacy.mk

# Top-level rules
default: images css css-int files legacy

css: dist/css/min/ $(CSS_OUTPUTS) $(INT_OUTPUTS)
images: dist/img/ $(IMAGE_OUTPUTS)
files: $(FILES_OUTPUTS)
legacy: dist/stable/styles/ $(LEGACY_CSS_OUTPUTS)

# Directory creation
dist/%/:
	mkdir -p $@

# npm rules
node_modules: package.json package-lock.json
	npm install
	touch node_modules

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

# INT rules
# Copied from above
#
# This does not actually use Makefile's template system since
# you can't have something be both a prerequisite and
# dynamically generated unfortunately.

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

# TEST - Sample / Test of INT capabilities
INT_SOURCES_TEST := $(wildcard src/css/int/test/*.patch)
INT_OUTPUTS_TEST := \
	dist/css/int/test/black-highlighter.css \
	dist/css/int/test/normalize.css \
	dist/css/int/test/min/black-highlighter.min.css \
	dist/css/int/test/min/normalize.min.css

dist/css/int/test/black-highlighter.css dist/css/int/test/normalize.css: $(INT_SOURCES_TEST)
	build/int-patch-and-merge.sh cn

dist/css/int/test/min/black-highlighter.min.css: dist/css/int/text/black-highlighter.css
	npm run postcss -- --config build/css-minify -o $@ $<

dist/css/int/test/min/normalize.min.css: dist/css/int/test/normalize.css
	npm run postcss -- --config build/css-minify -o $@ $<

# Legacy symlinks for stable/styles CSS
dist/stable/styles/DEPRECATED: src/misc/legacy-deprecation-notice.txt
	install -D -m444 $< $@

dist/stable/styles/black-highlighter.min.css:
	cd $(@D); ln -sf ../../css/min/$(@F)

dist/stable/styles/normalize.min.css:
	cd $(@D); ln -sf ../../css/min/$(@F)

# Image optimization
dist/img/%.gif: src/img/%.gif node_modules
	npm run optimize -- gif $< $@

dist/img/%.png: src/img/%.png node_modules
	npm run optimize -- png $< $@

dist/img/%.svg: src/img/%.svg node_modules
	npm run optimize -- svg $< $@

# Static files
dist/spherical/domicile.html: src/misc/domicile.html
	install -D -m644 $< $@

dist/%.html: src/root/%.html
	install -D -m644 $< $@

# Utility rules
clean:
	rm -rf dist
