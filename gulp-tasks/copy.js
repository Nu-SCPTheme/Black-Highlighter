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
];

// make sure paths do not end with slash
function sanitizePath(filepath) {
  let sanitizedFilepath = filepath;
  if (filepath.slice(-1) === "/") {
    sanitizedFilepath = filepath.slice(0, -1);
  }
  return sanitizedFilepath;
}

// copy assets
function copyAssets(done) {
  assetsDirs.forEach(dir => {
    // glob all files
    let files = glob.sync(`${dir.src}/*`, { nodir: true });

    // copy each file to dist dir
    files.forEach(file => {
      let srcFile = file;
      let distFile = srcFile.replace(dir.src, dir.dist);
      let dir.distname = path.dirname(distFile);

      if (!fs.existsSync(dir.distname)) {
        fs.mkdirSync(dir.distname, { recursive: true });
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
