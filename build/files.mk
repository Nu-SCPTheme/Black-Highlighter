# Variables
FILES_SOURCES := \
	src/misc/domicile.html \
	src/misc/gitattributes \
	src/root/index.html \
	src/root/error.html
FILES_OUTPUTS := \
	dist/spherical/domicile.html \
	dist/.gitattributes \
	dist/index.html \
	dist/error.html

# Dummy rules
pnpm-lock.yaml:

# File copy
dist/spherical/domicile.html: src/misc/domicile.html
	build/install.sh 644 $< $@

dist/.gitattributes: src/misc/gitattributes
	build/install.sh 644 $< $@

dist/%.html: src/root/%.html
	build/install.sh 644 $< $@

# Special rule, delete anything not meant for S3
clean-up-s3:
	rm -rf dist/spherical dist/.gitattributes dist/*.html
