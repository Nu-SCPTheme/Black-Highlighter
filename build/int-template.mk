# Template for creating rules for new branches
#
# This template isn't directly used!
#
# Because Makefile can't have something both as a dynamic
# list and as requisites we're just copying and pasting
# these rules.
#
# There aren't many INT branches so this isn't too terrible.

define INT_BRANCHES_template =
INT_SOURCES_$(1) := $(wildcard src/css/int/$(1)/*.patch)
INT_OUTPUTS_$(1) := \
	dist/css/int/$(1)/black-highlighter.css \
	dist/css/int/$(1)/normalize.css \
	dist/css/int/$(1)/min/black-highlighter.min.css \
	dist/css/int/$(1)/min/normalize.min.css

dist/css/int/$(1)/:
	mkdir -p $@

dist/css/int/$(1)/black-highlighter.css dist/css/int/$(1)/normalize.css: $(INT_SOURCES_$(1))
	build/int-patch-and-merge.sh $(1)

dist/css/int/$(1)/min/black-highlighter.min.css: dist/css/int/$(1)/black-highlighter.css
	npm run postcss -- --config build/css-minify -o $$@ $$<

dist/css/int/$(1)/min/normalize.min.css: dist/css/int/$(1)/normalize.css
	npm run postcss -- --config build/css-minify -o $$@ $$<
endef
