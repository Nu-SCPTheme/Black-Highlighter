# Image files to run the optimizer on
IMAGE_OPTIMIZE_SOURCES := $(wildcard src/img/*.*)
IMAGE_OPTIMIZE_OUTPUTS := $(patsubst src/img/%,dist/img/%,$(IMAGE_OPTIMIZE_SOURCES))

# Image files to copy as-is
IMAGE_PLAIN_SOURCES    := $(wildcard src/img/page-toolbar-icons/* src/img/text-editor-icons/*)
IMAGE_PLAIN_OUTPUTS    := $(patsubst src/img/%,dist/img/%,$(IMAGE_PLAIN_SOURCES))

# Image optimization rules
dist/img/%.gif: src/img/%.gif node_modules
	npm run optimize -- gif $< $@

dist/img/%.png: src/img/%.png node_modules
	npm run optimize -- png $< $@

dist/img/%.svg: src/img/%.svg node_modules
	npm run optimize -- svg $< $@

# Image copy rule
dist/img/%: src/img/%
	build/install.sh 644 $< $@
