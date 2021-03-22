
# Dynamic patching and building for any INT directories present
INT_BRANCHES  := \
	cn \
	test

INT_SOURCES   := \
	$(INT_SOURCES_CN) \
	$(INT_SOURCES_TEST)

INT_OUTPUTS   := \
	$(INT_OUTPUTS_CN) \
	$(INT_OUTPUTS_TEST)

INT_DIRS      := $(patsubst src/css/int/%,%,$(wildcard src/css/int/*))

# Assert that the directories in INT match the constant list.
ifneq ($(INT_BRANCHES), $(INT_DIRS))
	$(error Declared list of branches doesn't match directory!)
endif

# See build/int-template.mk for the template and why this code has to be duplicated
