# Variables
FILES_SOURCES := \
	src/misc/domicile.html \
	src/root/index.html \
	src/root/error.html
FILES_OUTPUTS := \
	dist/spherical/domicile.html \
	dist/index.html \
	dist/error.html

# Dummy rules
package-lock.json:

dist/spherical/domicile.html: src/misc/domicile.html
	build/install.sh 644 $< $@

dist/%.html: src/root/%.html
	build/install.sh 644 $< $@
