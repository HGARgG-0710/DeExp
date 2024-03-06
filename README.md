# deExp

A simple Node command-line utility for file-alteration with the usage of Regular Expressions. 

## Installation

Install with npm:

	npm install deexp

## Usage

The command takes in four arguments. 
Run via npx: 

	npx deexp [fromfile] [tofile] [mode] [...args]

Where: 

1. fromfile - the path to the text file to be used as input
2. tofile - the path of the text file to be used as output (created if doesn't exist, otherwise truncated)
3. mode - a command to be run on the file, one of:
	* re/replace
	* ad/add
	* de/delete
4. args - the appropriate arguments for the command in question

For examples of usage/output, see the 'tests' directory. 

### Commands available (and arguments for them)

#### re/replace

Will replace the given regular expression with a string.

Arguments: 

1. Regular expression for search and replacement
2. New string to replace with

#### ad/add

Will add the new string to the file in the given regular expressions range. 

Arguments: 

1. String to add
2. Regular expression to add occurrence of after (optional, if 3. is present)
3. Regular expression to add occurrence of before (optional, if 2. is present)

Note: either of 2. or 3. MUST be given

#### de/delete

Will delete (cut out) all the occurrences of the regular expression passed from the file.

Arguments: 

1. Regular expression for deletion 

### Using in scripts

The package is particularly useful when writing scripts for textual transformations of files, for every single operation of transfromation is but a single command. They can get very complex, without having to employ a larger transformation vocabulary, than add/delete/replace. 
Similarly, the transformations can be carried out on a single file, making the program perfect for the said format.