# Variables
IMAGE_SOURCES := $(wildcard src/img/*)
IMAGE_OUTPUTS := $(patsubst src/img/%,dist/img/%,$(IMAGE_SOURCES))

# Image optimization
dist/img/%.gif: src/img/%.gif node_modules
	npm run optimize -- gif $< $@

dist/img/%.png: src/img/%.png node_modules
	npm run optimize -- png $< $@

dist/img/%.svg: src/img/%.svg node_modules
	npm run optimize -- svg $< $@
