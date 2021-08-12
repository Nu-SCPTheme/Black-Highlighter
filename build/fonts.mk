# Variables
FONTS_COPY_SOURCES := $(wildcard src/fonts/* src/fonts/int/*)
FONTS_COPY_OUTPUTS := $(patsubst src/fonts/%,dist/fonts/%,$(FONTS_COPY_SOURCES))

# Fonts to copy
dist/fonts/%: src/fonts/%
	build/install.sh 644 $< $@

dist/fonts/int/%: src/fonts/int/%
	build/install.sh 644 $< $@
