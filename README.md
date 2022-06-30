# Black Highlighter

[![Travis CI Build Status](https://travis-ci.org/Nu-SCPTheme/Black-Highlighter.svg?branch=master)](https://travis-ci.org/Nu-SCPTheme/Black-Highlighter)

    [2019-2021 Wikidot Theme]
    Designed by Woedenaz, Croquembouche, & djkaktus
    Built by Woedenaz, Croquembouche, aismallard & rounderhouse (for some reason)


A WiP new theme for the SCP Wiki utilizing more current CSS styling standards.

See a preview overwriting Sigma-9 here: https://scp-wiki.wikidot.com/scp-4999

See a preview without the Sigma-9 here: https://scptestwiki.wikidot.com/

### Build

On a UNIX-like environment with GNU Makefile, you can build Black Highlighter from its source files using the following:

```
npm install
make
```

This will perform the combinations, minifications, etc. all automatically. All affected files will appear in `/dist`.

The `Makefile` was constructed to be rigorous with requisites and outputs, it should only rebuild what has since been modified. As such, you can run the build in parallel with jobservers, such as `make -j 4`.

However (for obvious reasons) `make` cannot determine if `node_modules` has all the required dependencies, it merely checks if the `node_modules/` directory exists. You will need to re-run `npm install` if you modify npm's local state.

Additionally, you can run `make -B` to force re-building all targets, or `make clean` to dispose of the `/dist` directory.
