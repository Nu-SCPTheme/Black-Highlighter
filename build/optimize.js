import { promises as fs } from 'fs';
import * as process2 from 'process';

import imagemin from 'imagemin';
import gifsicle from 'imagemin-gifsicle';
import optipng from 'imagemin-optipng';
import svgo from 'imagemin-svgo';

async function process(minifier, inputPath, outputPath) {
  const inputBuffer = await fs.readFile(inputPath);
  const outputBuffer = await minifier(inputBuffer);
  await fs.writeFile(outputPath, outputBuffer);
}

function main() {
  // Usage: node build/optimize.js <file-type> <input> <output>
  const fileType = process2.argv[2];
  const input = process2.argv[3];
  const output = process2.argv[4];

  let minifier;
  switch (fileType) {
    case 'gif':
      minifier = gifsicle({ interlaced: true });
      break;
    case 'png':
      minifier = optipng({ optimizationLevel: 5 });
      break;
    case 'svg':
      minifier = svgo({
        plugins: [
          { removeDoctype: false },
          { removeViewBox: false },
          { removeXMLProcInst: false },
          { collapseGroups: true },
          { convertPathData: true },
          { removeUselessStrokeAndFill: true },
          { cleanupNumericValues: { floatPrecision: 2 } },
          { mergePaths: true },
          { sortAttrs: true },
          { convertShapeToPath: true },
          { js2svg: { pretty: true } },
        ],
      });
      break;
    default:
      throw new Error(`Unknown image type to optimize: ${fileType}`);
  }

  process(minifier, input, output);
}

main();
