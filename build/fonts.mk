# Variables
FONTS_COPY_SOURCES := $(wildcard src/fonts/* src/fonts/int/chinese-simplified/* src/fonts/int/chinese-traditional/* src/fonts/int/japanese/* src/fonts/int/korean/* src/fonts/int/thai-vietnamese/*)
FONTS_COPY_OUTPUTS := $(patsubst src/fonts/%,dist/fonts/%,$(FONTS_COPY_SOURCES))

# Fonts to copy
dist/fonts/%: src/fonts/%
	build/install.sh 644 $< $@

dist/fonts/int/chinese-simplified/%: src/fonts/int/chinese-simplified/%
	build/install.sh 644 $< $@

dist/fonts/int/chinese-traditional/%: src/fonts/int/chinese-traditional/%
	build/install.sh 644 $< $@

dist/fonts/int/japanese/%: src/fonts/int/japanese/%
	build/install.sh 644 $< $@

dist/fonts/int/korean/%: src/fonts/int/korean/%
	build/install.sh 644 $< $@

dist/fonts/int/thai-vietnamese/%: src/fonts/int/thai-vietnamese/%
	build/install.sh 644 $< $@
