# When != 0, the code is not minimized
DEBUG = 0

# Set the source directory
SRC_FOLDER = ../src-dev/

# Create the list of modules (the order is important)
MODULES = $(SRC_FOLDER)InheritanceApi.js \
	  $(SRC_FOLDER)jQuery_extend.js \
	  $(SRC_FOLDER)Extend.js \
	  $(SRC_FOLDER)Implement.js \
	  $(SRC_FOLDER)Class.js

# Output folder, name and path for modules
OUTPUT_FOLDER =
OUTPUT_NAME = class
OUTPUT_FILE = $(OUTPUT_FOLDER)$(OUTPUT_NAME)

# Compiler bin and flags
COMPILER_BIN = ~/bin/Utils/google_compiler/compiler.jar
COMPILER_FLAGS = --js=$(MODULES) --js_output_file=$(OUTPUT_FILE)-min.js --language_in ECMASCRIPT5_STRICT; 

ifeq ($(DEBUG),0)
	BUILD_COMMAND = java -jar $(COMPILER_BIN) $(COMPILER_FLAGS)
else 
	BUILD_COMMAND = cat $(MODULES) > class-min.js 
endif

class-min.js:
	$(BUILD_COMMAND)

.PHONY: clean
clean:
	rm $(OUTPUT_NAME)-min.js

#all: clean class-min.js
