.SUFFIXES:
.PHONY: default
.PHONY: images css
.PHONY: css-merge css-build css-normalize css-supports

# Fields
IMAGE_SOURCES := $(wildcard src/img/*)
IMAGE_OUTPUTS := $(patsubst src/img/%,dist/img/%,$(IMAGE_SOURCES))

CSS_SOURCES   := $(wildcard src/css/*.css)

# Top-level rules
default: images css

images: $(IMAGE_OUTPUTS)

css:
	:

# Specific rules
dist/img/%.gif: src/img/%.gif
	npm run optimize -- gif $< $@

dist/img/%.png: src/img/%.png
	npm run optimize -- png $< $@

dist/img/%.svg: src/img/%.svg
	npm run optimize -- svg $< $@
