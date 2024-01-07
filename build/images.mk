# Variables
IMAGE_COPY_SOURCES := $(wildcard src/img/page-toolbar-icons/* src/img/text-editor-icons/* src/img/social-icons/*)
IMAGE_COPY_OUTPUTS := $(patsubst src/img/%,dist/img/%,$(IMAGE_COPY_SOURCES))

IMAGE_OPTIMIZE_SOURCES := $(wildcard src/img/*)
IMAGE_OPTIMIZE_OUTPUTS := $(patsubst src/img/%,dist/img/%,$(IMAGE_OPTIMIZE_SOURCES))

# Images to copy with size check
dist/img/page-toolbar-icons/%: src/img/page-toolbar-icons/% $(IMAGE_COPY_SOURCES)
	build/install.sh 644 $< $@

dist/img/text-editor-icons/%: src/img/text-editor-icons/% $(IMAGE_COPY_SOURCES)
	build/install.sh 644 $< $@

dist/img/social-icons/%: src/img/social-icons/% $(IMAGE_COPY_SOURCES)
	build/install.sh 644 $< $@

# Images to optimize with size check
dist/img/%.png: src/img/%.png $(IMAGE_OPTIMIZE_SOURCES) node_modules
	bun svgo $< -o $@

dist/img/%.svg: src/img/%.svg $(IMAGE_OPTIMIZE_SOURCES) node_modules
	bun svgo $< -o $@
