SCP_TEST_SOURCES := \
	src/scp-test-page.html \
	src/scp-test-page.js

SCP_TEST_OUTPUTS := \
	dist/scp-test-page.html \
	dist/scp-test-page.js

# Copy and inline-patch files
dist/scp-test-page.html: scp-test-page/scp-test-page.html
	install -D -m644 $< $@
	sed -i 's|\./scp-test-page.js|/scp-test-page.js|' $@

dist/scp-test-page.js: scp-test-page/scp-test-page.js
	install -D -m644 $< $@
	sed -i 's|\.\./src/css|/css|' $@

