import fs from "fs";
import path from "path";
import globalData from "@csstools/postcss-global-data";
import stylelint from "stylelint";
import postcssImport from "postcss-import";
import postcssMixins from "postcss-mixins";
import presetEnv from "postcss-preset-env";
import autoprefixer from "autoprefixer";
import url from "postcss-url";
import csso from "postcss-csso";
import reporter from "postcss-reporter";
/* Disabling LightningCSS until its functionality is a little more robust
import lightningCSS from "postcss-lightningcss";
*/

export default (ctx) => {

	const nodeEnv = ctx.env;
	const dev = nodeEnv === "development";
	const browserslist = fs.readFileSync(path.resolve(ctx.file.dirname, "../../.browserslistrc"), "utf8").trim();

	const globalDataOptions = {
		files: [ path.join( ctx.file.dirname,"/parts/root.css" ) ]
	};

	const stylelintOptions = {
		configFile: path.join(ctx.cwd, "/.stylelintrc"),
		fix: true
	};

	const mixinOptions = {
		mixinsDir: path.join( ctx.file.dirname,"/parts" )
	};

	const presetEnvOptions = ({
		autoprefixer: false,
		preserve: false,
		browsers: browserslist,
		features: {
			"custom-properties": false,
			"custom-media-queries": true,
			"media-query-ranges": true,
			"nesting-rules": true,
			"has-pseudo-class": true,
			"is-pseudo-class": false
		}
	});

	const urlOptions = ({
		url: "rebase"
	});

	const fileImportOptions = {
		plugins: [
			globalData(globalDataOptions),
			presetEnv(presetEnvOptions),
			url(urlOptions),
			postcssMixins(mixinOptions),
			autoprefixer
		]
	};

	const cssoOptions = ({
		restructure: !dev,
		forceMediaMerge: !dev,
		sourceMap: true
	});

	/* 	==============================
			LIGHTNING CSS DISABLED FOR NOW
			==============================
	const lightningcssOptions = ({
		filename: path.join(ctx.file.dirname,"/",ctx.file.basename),
		browsers: browserslist,
		lightningcssOptions: {
			projectRoot: path.join( ctx.file.dirname,"/parts" ),
			minify: !dev,
			sourceMap: true,
			errorRecovery: false,
			drafts: {
				nesting: true,
				customMedia: true
			},
			visitor: {
				/* Assures relative URL links point to the correct files on /dist */
				/* Url(url) {
					let urlArray = url.url.split("/").reverse();
					if (url.url.includes("../")) {
						dev ? [
							url.url = `../${urlArray[1]}/${urlArray[0]}`
						] : [
							url.url = `../../${urlArray[1]}/${urlArray[0]}`
						];
					}
				return url;
				}
			}
		}
	});
	*/

	const reporterOptions = {
		formatter: input => {
			return input.source + " produced " + input.messages.length + " messages \n";
		},
		clearMessages: true
	};

	let plugins = [];

	switch(nodeEnv) {
		/*
		case "lightningcss":
			plugins = [
				postcssImport(fileImportOptions),
				lightningcss(lightningcssOptions),
				reporter(reporterOptions)
			];
			break;
		*/
		case "production":
			plugins = [
				stylelint(stylelintOptions),
				postcssImport(fileImportOptions),
				csso(cssoOptions),
				reporter(reporterOptions)
			];
			break;
		case "development":
			plugins = [
				stylelint(stylelintOptions),
				postcssImport(fileImportOptions),
				reporter(reporterOptions)
			];
			break;
		default:
			console.log("No ENV defined so no Plugins enabled.");
	}

	return {
		map: {inline: false},
		plugins: plugins
	};
};
