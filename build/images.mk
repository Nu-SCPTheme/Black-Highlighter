
IMAGE_SOURCES := $(wildcard src/img/*)
IMAGE_OUTPUTS := $(patsubst src/img/%,dist/img/%,$(IMAGE_SOURCES))
