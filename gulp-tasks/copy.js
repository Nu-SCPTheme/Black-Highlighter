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
        fs.copyFile(srcFile, distFile, err => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  });

  done();
}

// exports
module.exports = {
  assets: copyAssets,
};
