# Black Highlighter

<p>
  <a href="https://github.com/Nu-SCPTheme/Black-Highlighter/actions?query=workflow%253ABuild">
    <img style="background:rgb(215,215,215);border-radius:1rem;"
         src="https://github.com/Nu-SCPTheme/Black-Highlighter/workflows/Build/badge.svg"
         alt="Black Highlighter build status badge">
  </a>
</p>

<p align="center">
  <img width="500"
       src="https://raw.githubusercontent.com/Nu-SCPTheme/Black-Highlighter/master/src/img/black-highlighter-logo.svg"
       alt="Black Highlighter Logo">
</p>

    [2019-2023 Wikidot Theme]
    Designed by Woedenaz, Croquembouche, & djkaktus
    Built by Woedenaz, Croquembouche, aismallard & rounderhouse (for some reason)

A base theme for the SCP Wiki utilizing more current CSS styling standards.
* Preview (overwriting Sigma): https://scpwiki.com/scp-4999
* Preview (base theme): https://scptestwiki.wikidot.com/

### Build

On a UNIX-like environment with GNU Makefile, you can build Black Highlighter from its source files using the following:

```
bun i
make
```

This will perform the combinations, minifications, etc. all automatically. All affected files will appear in `/dist`.

The `Makefile` was constructed to be rigorous with requisites and outputs, it should only rebuild what has since been modified. As such, you can run the build in parallel with jobservers, such as `make -j 4`.

However (for obvious reasons) `make` cannot determine if `node_modules` has all the required dependencies, it merely checks if the `node_modules/` directory exists. You will need to re-run `bun i` if you modify npm's local state.

Additionally, you can run `make -B` to force re-building all targets, or `make clean` to dispose of the `/dist` directory.
