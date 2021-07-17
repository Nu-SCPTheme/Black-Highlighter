# Variables
FONTS_SOURCES := $(wildcard src/fonts/*)
FONTS_OUTPUTS := $(patsubst src/fonts/%,dist/fonts/%,$(FONTS_SOURCES))

# Dummy rules
dist/fonts/%.woff: src/fonts/%.woff
	build/install.sh 644 $< $@

dist/fonts/%.woff2: src/fonts/%.woff2
	build/install.sh 644 $< $@

dist/fonts/%.css: src/fonts/%.css
	build/install.sh 644 $< $@
