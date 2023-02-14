# Variables
IMAGE_COPY_SOURCES := $(wildcard src/img/page-toolbar-icons/* src/img/text-editor-icons/* src/img/social-icons/*)
IMAGE_COPY_OUTPUTS := $(patsubst src/img/%,dist/img/%,$(IMAGE_COPY_SOURCES))

IMAGE_OPTIMIZE_SOURCES := $(wildcard src/img/*)
IMAGE_OPTIMIZE_OUTPUTS := $(patsubst src/img/%,dist/img/%,$(IMAGE_OPTIMIZE_SOURCES))

# Images to copy
dist/img/page-toolbar-icons/%: src/img/page-toolbar-icons/%
	build/install.sh 644 $< $@

dist/img/text-editor-icons/%: src/img/text-editor-icons/%
	build/install.sh 644 $< $@

dist/img/social-icons/%: src/img/social-icons/%
	build/install.sh 644 $< $@

# Images to optimize
dist/img/%.svg: src/img/%.svg node_modules
	npm run svgo -- $< --config ./build/svgo.config.js -o $@
