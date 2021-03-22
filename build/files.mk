# Variables
FILES_SOURCES := \
	src/misc/domicile.html \
	src/root/index.html \
	src/root/error.html
FILES_OUTPUTS := \
	dist/spherical/domicile.html \
	dist/index.html \
	dist/error.html

# Static files
dist/spherical/domicile.html: src/misc/domicile.html
	install -D -m644 $< $@

dist/%.html: src/root/%.html
	install -D -m644 $< $@
