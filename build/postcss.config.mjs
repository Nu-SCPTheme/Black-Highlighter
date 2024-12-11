import fs from "fs";
import path from "path";
import postcssImport from "postcss-import";
import postcssMixins from "postcss-mixins";
import stylelint from "stylelint";
import postcssLightningcss from "postcss-lightningcss";
import reporter from "postcss-reporter";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";

export default (ctx) => {
	const nodeEnv = ctx.env;
	const dev = nodeEnv === "development";

	const browserslistpath = path.resolve(
		ctx.file.dirname,
		"../../.browserslistrc"
	);
	const browserslistText = fs.readFileSync(browserslistpath, "utf8").trim();
	const browserTargets = browserslistToTargets(
		browserslist(browserslistText)
	);

	const stylelintOptions = {
		configFile: path.join(ctx.cwd, "/.stylelintrc"),
		fix: true
	};

	const mixinOptions = {
		mixinsDir: path.join(ctx.file.dirname, "/parts")
	};

	const lightningcssOptions = {
		browsers: browserslistText,
		lightningcssOptions: {
			minify: !dev,
			sourceMap: true,
			cssModules: false,
			targets: browserTargets,
			drafts: {
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
		formatter: (input) =>
			`${input.source} produced ${input.messages.length} messages \n`,
		clearMessages: true
	};

	let plugins = [];

	switch (nodeEnv) {
		case "production":
		case "development":
			plugins = [
				postcssImport(), // Add postcss-import at the beginning
				stylelint(stylelintOptions),
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
