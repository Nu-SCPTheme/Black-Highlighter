MAKEFLAGS += --no-builtin-rules
.SUFFIXES:

.PHONY: default
.PHONY: images css css-int files legacy
.PHONY: clean

# Default rule
default: images css css-int files legacy

# Sub-makefiles included
include build/meta.mk
include build/css.mk
include build/images.mk
include build/files.mk
include build/int.mk
include build/legacy.mk

# Top-level rules
css: dist/css/min/ $(CSS_OUTPUTS) $(INT_OUTPUTS)
images: dist/img/ $(IMAGE_OUTPUTS)
files: $(FILES_OUTPUTS)
legacy: dist/stable/styles/ $(LEGACY_CSS_OUTPUTS)

# Utility rules
clean:
	rm -rf dist
