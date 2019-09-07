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
    src: "./src/root/",
    dist: "./dist/",
  },
  {
    src: "./src/misc/",
    dist: "./dist/spherical/",
  },
];

function copyAssets(dir) {
  // glob all files
  let entries = glob.sync(`${dir.src}/*`);

  // copy each file to dist dir
  entries.forEach(entry => {
    // copy directories recursively
    let stats = fs.lstatSync(entry);
    if (stats.isDirectory()) {
      let newDir = {
        src: entry,
        dist: `${dir.dist}/${path.basename(entry)}`,
      };

      copyAssets(newDir);
      return;
    }

    // copy files
    let srcFile = entry;
    let distFile = srcFile.replace(dir.src, dir.dist);
    let distDir = path.dirname(distFile);

    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    if (!fs.existsSync(distFile)) {
      stats = fs.lstatSync(srcFile);

      // copy symlinks as symlinks
      if (stats.isSymbolicLink()) {
        let path = fs.readlinkSync(srcFile);
        fs.symlinkSync(path, distFile);
      } else {
        fs.copyFileSync(srcFile, distFile);
      }
    }
  });
}

function copyAllAssets(done) {
  assetsDirs.forEach(copyAssets);
  done();
}

// exports
module.exports = {
  assets: copyAllAssets,
};
