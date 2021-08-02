# Variables
FONTS_SOURCES := $(wildcard src/fonts/*)
FONTS_OUTPUTS := $(patsubst src/fonts/%,dist/fonts/%,$(FONTS_SOURCES))

# Static file rule
dist/fonts/%: src/fonts/%
	build/install.sh 644 $< $@
