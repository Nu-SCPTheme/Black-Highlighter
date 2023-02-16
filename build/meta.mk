# Variables
BUILD_SOURCES := \
	$(wildcard build/*)

# Directory creation
DIRECTORIES := \
	dist/css/ \
	dist/css/min/ \
	dist/css/parts/ \
	dist/css/parts/int/ \
	dist/fonts/ \
	dist/fonts/int \
	dist/fonts/int/chinese-simplified \
	dist/fonts/int/chinese-traditional \
	dist/fonts/int/japanese \
	dist/fonts/int/korean \
	dist/fonts/int/thai-vietnamese \
	dist/img/ \
	dist/img/page-toolbar-icons \
	dist/img/text-editor-icons \
	dist/img/social-icons \
	dist/stable/styles/

$(DIRECTORIES):
	mkdir -p $@

# pnpm rules
node_modules: package.json package-lock.json
	pnpm install
	touch node_modules
