import fs from "fs";
import path from "path";
import postcss from "postcss";
import postcssMixins from "postcss-mixins";
import stylelint from "stylelint";
import postcssLightningcss from "postcss-lightningcss";
import reporter from "postcss-reporter";
import { bundleAsync } from "lightningcss";

const lightningcssBundle = (opts = {}) => {
	return {
		postcssPlugin: "lightningcss-bundle",
		async Once(root, { result }) {
			const filename = opts.filename || result.opts.from;
			const tempRoot = postcss.root();

			try {
				const { code } = await bundleAsync({
					filename,
					...opts.lightningcssOptions,
					resolver: {
						read(filePath) {
							if (filePath.startsWith('http')) {
								return '';
							}
							return fs.readFileSync(filePath, 'utf8');
						},
						resolve(specifier, from) {
							if (specifier.startsWith('http')) {
								return from;
							}
							const resolvedPath = path.resolve(path.dirname(from), specifier);
							const content = fs.readFileSync(resolvedPath, 'utf8');
							tempRoot.append(postcss.parse(content));
							return resolvedPath;
						}
					}
				});

				root.removeAll();
				root.append(tempRoot);
				root.append(postcss.parse(code));
			} catch (error) {
				console.error("LightningCSS bundling error:", error);
				throw error;
			}
		}
	};
};

export default (ctx) => {
	const nodeEnv = ctx.env;
	const dev = nodeEnv === "development";

	const browserslistpath = path.resolve(ctx.file.dirname, "../../.browserslistrc");
	const browserslist = fs.readFileSync(browserslistpath, "utf8").trim();

	const stylelintOptions = {
		configFile: path.join(ctx.cwd, "/.stylelintrc"),
		fix: true
	};

	const mixinOptions = {
		mixinsDir: path.join(ctx.file.dirname, "/parts")
	};

	lightningcssBundle.postcss = true;

	const lightningcssOptions = {
		browsers: browserslist,
		lightningcssOptions: {
			minify: !dev,
			sourceMap: true,
			cssModules: false,
			drafts: {
				nesting: true,
				customMedia: true
			},
			visitor: {
				Url(url) {
					if (!dev) {
						url.url = url.url;
					} else {
						if (url.url.startsWith("../../")) {
							url.url = url.url.replace("../../", "../");
						}
					}
					return url;
				}
			}
		},
	};

	const reporterOptions = {
		formatter: input => {
			return input.source + " produced " + input.messages.length + " messages \n";
		},
		clearMessages: true
	};

	let plugins = [];

	switch (nodeEnv) {
		case "production":
		case "development":
			plugins = [
				stylelint(stylelintOptions),
				lightningcssBundle(lightningcssOptions),
				postcssMixins(mixinOptions),
				postcssLightningcss(lightningcssOptions),
				reporter(reporterOptions)
			];
			break;
		default:
			console.log("No ENV defined so no Plugins enabled.");
	}

	return {
		map: { inline: false },
		plugins: plugins
	};
};
