# Variables
CSS_COPY_SOURCES := $(wildcard src/css/parts/* src/css/parts/int/*)
CSS_COPY_OUTPUTS := $(patsubst src/css/parts/%,dist/css/parts/%,$(CSS_COPY_SOURCES))

CSS_SOURCES := $(wildcard src/css/*.css src/css/parts/*.css src/css/parts/int/*.css)
CSS_OUTPUTS := \
	dist/css/black-highlighter.css \
	dist/css/normalize.css \
	dist/css/min/black-highlighter.min.css \
	dist/css/min/normalize.min.css

# Copy CSS Rules
dist/css/parts/%: src/css/parts/%
	build/install.sh 644 $< $@

# CSS rules
dist/css/black-highlighter.css: src/css/black-highlighter.css $(BUILD_SOURCES) $(CSS_SOURCES) node_modules
	build/install.sh 644 $< $@ &&	pnpm css $@ --config build --env development -r

dist/css/min/black-highlighter.min.css: dist/css/black-highlighter.css node_modules
	pnpm css $< --config build --env production -o $@

dist/css/normalize.css: src/css/normalize.css $(BUILD_SOURCES) node_modules
	build/install.sh 644 $< $@ &&	pnpm css $@ --config build --env development -r

dist/css/min/normalize.min.css: dist/css/normalize.css node_modules
	pnpm css $< --config build --env production -o $@
