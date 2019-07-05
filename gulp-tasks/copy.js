// packages
const fs = require("fs");
const glob = require("glob");
const path = require("path");

// config
const assetsDirs = [
  {
    src: "./src/img/",
    dist: "./dist/img/",
  },
  {
    src: "./src/legacy/",
    dist: "./dist/stable/styles/",
  },
  {
    src: "./src/misc/",
    dist: "./dist/spherical/",
  },
];

// copy assets
function copyAssets(done) {
  assetsDirs.forEach(dir => {
    // glob all files
    let files = glob.sync(`${dir.src}/*`, { nodir: true });

    // copy each file to dist dir
    files.forEach(file => {
      let srcFile = file;
      let distFile = srcFile.replace(dir.src, dir.dist);
      let distDir = path.dirname(distFile);

      if (!fs.existsSync(dir.distname)) {
        fs.mkdirSync(distDir, { recursive: true });
      }

      if (!fs.existsSync(distFile)) {
        let stats = fs.lstatSync(srcFile);

        // copy symlinks as symlinks
        if (stats.isSymbolicLink()) {
          let path = fs.readlinkSync(srcFile);
          fs.symlinkSync(path, distFile);
        } else {
          fs.copyFileSync(srcFile, distFile);
        }
      }
    });
  });

  done();
}

// exports
module.exports = {
  assets: copyAssets,
};
