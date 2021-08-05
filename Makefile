MAKEFLAGS += --no-builtin-rules
.SUFFIXES:

.PHONY: default
.PHONY: images css css-int files fonts scp-test legacy
.PHONY: clean

# Default rule
default: images css css-int files fonts scp-test legacy

# Sub-makefiles included
include build/meta.mk
include build/css.mk
include build/images.mk
include build/files.mk
include build/fonts.mk
include build/int.mk
include build/legacy.mk
include build/scp-test.mk

# Top-level rules
css: dist/css/min/ $(CSS_OUTPUTS) $(INT_OUTPUTS)
images: dist/img/ $(IMAGE_COPY_OUTPUTS) $(IMAGE_OPTIMIZE_OUTPUTS)
files: $(FILES_OUTPUTS)
fonts: dist/fonts/ $(FONTS_OUTPUTS)
scp-test: $(SCP_TEST_OUTPUTS)
legacy: dist/stable/styles/ $(LEGACY_CSS_OUTPUTS)

# Utility rules
clean:
	rm -rf dist src/beta
