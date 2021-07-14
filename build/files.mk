# Variables
FILES_SOURCES := \
	scp-test-page/scp-test-page.html \
	scp-test-page/scp-test-page.js \
	src/misc/domicile.html \
	src/root/index.html \
	src/root/error.html
FILES_OUTPUTS := \
	dist/scp-test-page.html \
	dist/scp-test-page.js \
	dist/spherical/domicile.html \
	dist/index.html \
	dist/error.html

# Dummy rules
package-lock.json:

# Static files
dist/scp-test-page.%: scp-test-page/scp-test-page.%
	install -D -m644 $< $@

dist/spherical/domicile.html: src/misc/domicile.html
	install -D -m644 $< $@

dist/%.html: src/root/%.html
	install -D -m644 $< $@
