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

# Top-level rules
default: images css files

css: dist/css/min $(CSS_OUTPUTS)
images: dist/img $(IMAGE_OUTPUTS)
files: dist/spherical $(FILES_OUTPUTS)

# Directory creation
dist/%:
	mkdir -p $@

# CSS rules
dist/css/black-highlighter.css: src/css/black-highlighter.css $(CSS_SOURCES)
	npm run postcss -- --config build/css-merge -o $@ $<

dist/css/min/black-highlighter.css: dist/css/black-highlighter.css
	npm run postcss -- --config build/css-minify -o $@ $<

dist/css/normalize.css: src/css/normalize.css
	cp $< $@

dist/css/min/normalize.css: dist/css/normalize.css
	npm run postcss -- --config build/css-minify -o $@ $<

# Image optimization
dist/img/%.gif: src/img/%.gif
	npm run optimize -- gif $< $@

dist/img/%.png: src/img/%.png
	npm run optimize -- png $< $@

dist/img/%.svg: src/img/%.svg
	npm run optimize -- svg $< $@

# Static files
dist/spherical/domicile.html: src/misc/domicile.html
	cp $< $@

dist/%.html: src/root/%.html
	cp $< $@

# Utility rules
clean:
	rm -rf dist
