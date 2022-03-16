import { promises as fs } from 'fs';
import * as process2 from 'process';

import * as gifsicle from 'imagemin-gifsicle';
import * as optipng from 'imagemin-optipng';
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
					{ name: 'removeDoctype',active: false},
					{ name: 'removeViewBox', active: false },
					{ name: 'removeXMLProcInst', active: false },
					{ name: 'collapseGroups' },
					{ name: 'convertPathData' },
					{ name: 'removeUselessStrokeAndFill' },
					{ name: 'cleanupNumericValues', params: { floatPrecision: 2 } },
					{ name: 'mergePaths' },
					{ name: 'sortAttrs' },
					{ name: 'convertShapeToPath' },
				],
			});
			break;
		default:
			throw new Error(`Unknown image type to optimize: ${fileType}`);
	}

	process(minifier, input, output);
}

main();
