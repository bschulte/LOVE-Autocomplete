# love-autocomplete README

This is a simple auto complete extension for the LOVE 2D game framework. It makes use of the LOVE API written in a lua table from [here](https://github.com/love2d-community/love-api)

* Autocomplete for modules, functions, types, and enums
* Signature suggestions for functions of modules and types
* Ctrl+Alt+D tries to open the LOVE 2D documentation for whatever the cursor is currently on
* Alt+L launches LOVE 2D in the current directory

## Requirements

No Requirements

## Extension Settings

No settings - planning on putting in ability to change hotkeys

## Known Issues

* When a function has multiple signatures, if you select anyone but the 1st and try to type a param it will switch back to the first signature.
* Command to launch love expects "love" to be in the path

## Release Notes

### 0.3.0

Added hotkey command to launch LOVE 2D from the current directory.

### 0.2.0

Added opening of LOVE 2D documentation

### 0.1.0

Initial release of LOVE-Autocomplete
