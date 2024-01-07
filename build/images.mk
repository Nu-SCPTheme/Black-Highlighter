# Variables
IMAGE_COPY_SOURCES := $(wildcard src/img/page-toolbar-icons/* src/img/text-editor-icons/* src/img/social-icons/*)
IMAGE_COPY_OUTPUTS := $(patsubst src/img/%,dist/img/%,$(IMAGE_COPY_SOURCES))

IMAGE_OPTIMIZE_SOURCES := $(wildcard src/img/*)
IMAGE_OPTIMIZE_OUTPUTS := $(patsubst src/img/%,dist/img/%,$(IMAGE_OPTIMIZE_SOURCES))

# Function to compare file sizes
define compare_exist_and_size
	@if [ ! -f $(2) ] || [ $$(stat -c%s $(1)) -ne $$(stat -c%s $(2)) ]; then \
		echo "Copying and optimizing $(1) -> $(2)"; \
		$(3); \
	fi
endef

# Images to copy with size check
dist/img/page-toolbar-icons/%: src/img/page-toolbar-icons/%
	$(call compare_exist_and_size,$<,$@,build/install.sh 644 $< $@)

dist/img/text-editor-icons/%: src/img/text-editor-icons/%
	$(call compare_exist_and_size,$<,$@,build/install.sh 644 $< $@)

dist/img/social-icons/%: src/img/social-icons/%
	$(call compare_exist_and_size,$<,$@,build/install.sh 644 $< $@)

# Images to optimize with size check
dist/img/%.png: src/img/%.png node_modules
	$(call compare_exist_and_size,$<,$@,bun svgo $< -o $@)

dist/img/%.svg: src/img/%.svg node_modules
	$(call compare_exist_and_size,$<,$@,bun svgo $< -o $@)
