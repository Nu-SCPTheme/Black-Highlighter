MAKEFLAGS += --no-builtin-rules
.SUFFIXES:

.PHONY: default
.PHONY: images css
.PHONY: css-merge css-build css-normalize css-supports
.PHONY: clean

# Fields
CSS_SOURCES   := $(wildcard src/css/*.css)
CSS_OUTPUTS   := \
	dist/css/min/black-highlighter.css \
	dist/css/min/normalize.css

IMAGE_SOURCES := $(wildcard src/img/*)
IMAGE_OUTPUTS := $(patsubst src/img/%,dist/img/%,$(IMAGE_SOURCES))

FILES_SOURCES := \
	src/misc/domicile.html \
	src/root/index.html \
	src/root/error.html
FILES_OUTPUTS := \
	dist/spherical/domicile.html \
	dist/index.html \
	dist/error.html

LEGACY_CSS_SOURCES := $(wildcard src/legacy/**/*)
LEGACY_CSS_OUTPUTS := $(patsubst src/legacy/%,dist/stable/styles/%,$(LEGACY_CSS_SOURCES))

# Top-level rules
default: images css files legacy

css: dist/css/min/ $(CSS_OUTPUTS)
images: dist/img/ $(IMAGE_OUTPUTS)
files: dist/spherical/ $(FILES_OUTPUTS)
legacy: dist/stable/styles

# Directory creation
dist/%/:
	mkdir -p $@

# npm rules
node_modules:
	npm install

# CSS rules
dist/css/black-highlighter.css: src/css/black-highlighter.css $(CSS_SOURCES) node_modules
	npm run postcss -- --config build/css-merge -o $@ $<
	cat \
		src/css/black-highlighter-wrap-begin.css \
		$@ \
		src/css/black-highlighter-wrap-close.css \
		> $@_
	mv $@_ $@

dist/css/min/black-highlighter.css: dist/css/black-highlighter.css node_modules
	npm run postcss -- --config build/css-minify -o $@ $<

dist/css/normalize.css: src/css/normalize.css src/css/normalize-wrap-begin.css src/css/normalize-wrap-close.css
	cat \
		src/css/normalize-wrap-begin.css \
		$< \
		src/css/normalize-wrap-close.css \
		> $@

dist/css/min/normalize.css: dist/css/normalize.css node_modules
	npm run postcss -- --config build/css-minify -o $@ $<

# Legacy CN style CSS
# TODO: replace
dist/stable/styles: src/legacy $(LEGACY_CSS_SOURCES)
	mkdir -p $(@D)
	cp -a $< $@

# Image optimization
dist/img/%.gif: src/img/%.gif node_modules
	npm run optimize -- gif $< $@

dist/img/%.png: src/img/%.png node_modules
	npm run optimize -- png $< $@

dist/img/%.svg: src/img/%.svg node_modules
	npm run optimize -- svg $< $@

# Static files
dist/spherical/domicile.html: src/misc/domicile.html
	cp $< $@

dist/%.html: src/root/%.html
	cp $< $@

# Utility rules
clean:
	rm -rf dist
