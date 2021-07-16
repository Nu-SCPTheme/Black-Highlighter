# Variables
LEGACY_CSS_SOURCES := \
	src/misc/legacy-deprecation-notice.txt
LEGACY_CSS_OUTPUTS := \
	dist/stable/styles/DEPRECATED \
	dist/stable/styles/black-highlighter.min.css \
	dist/stable/styles/normalize.min.css

# Legacy symlinks for stable/styles CSS
dist/stable/styles/DEPRECATED: src/misc/legacy-deprecation-notice.txt
	build/install.sh 444 $< $@

dist/stable/styles/black-highlighter.min.css:
	cd $(@D); ln -sf ../../css/min/$(@F)

dist/stable/styles/normalize.min.css:
	cd $(@D); ln -sf ../../css/min/$(@F)
