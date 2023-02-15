"use strict";

module.exports = (ctx) => {

	const path = require("path");
	const stylelint = require("stylelint");
	const postcssImport = require("postcss-import");
	const postcssMixins = require("postcss-mixins");
	const presetEnv = require("postcss-preset-env");
	const nesting = require("postcss-nesting");
	const autoprefixer = require("autoprefixer");
	const url = require("postcss-url");
	const csso = require("postcss-csso");
	const reporter = require("postcss-reporter");

	const lightningcss = require("postcss-lightningcss");
	const browserslist = require("../package.json").browserslist;

	const nodeEnv = ctx.env;

	const fileImportOptions = {};

	const stylelintOptions = {
		configFile: path.join(__dirname, "../.stylelintrc"),
		fix: nodeEnv === "development" ? true : false
	};

	const mixinOptions = {
		mixinsDir: path.join(__dirname, "../src/css")
	};

	const presetEnvOptions = ({
		stage: 2,
		minimumVendorImplementations: 2,
		autoprefixer: false,
		features: {
			"custom-media-queries": true,
			"has-pseudo-class": true
		}
	});

	const urlOptions = ({
		url: "rebase",
		assetsPath: path.join(__dirname, "../dist")
	});

	const cssoOptions = ({
		restructure: true,
		sourceMap: true
	});

	const lightningcssOptions = ({
		filename: path.join(ctx.file.dirname,"/",ctx.file.basename),
		browsers: browserslist,
		lightningcssOptions: {
			projectRoot: path.join( ctx.file.dirname,"/parts" ),
			minify: nodeEnv === "development" ? false : true,
			sourceMap: true,
			errorRecovery: false,
			drafts: {
				nesting: true,
				customMedia: true
			},
			visitor: {
				/* Assures relative URL links point to the correct files on /dist */
				Url(url) {
					let urlArray = url.url.split("/").reverse();
					if (url.url.includes("../")) {
						nodeEnv === "development" ? [
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

	const reporterOptions = {
		formatter: input => {
			return input.source + " produced " + input.messages.length + " messages \n";
		},
		clearMessages: true
	};

	let plugins = [];

	switch(nodeEnv) {
		case "lightningcss":
			plugins = [
				postcssImport(fileImportOptions),
				lightningcss(lightningcssOptions),
				postcssMixins(mixinOptions),
				reporter(reporterOptions)
			];
			break;
		case "production":
			plugins = [
				postcssImport(fileImportOptions),
				presetEnv(presetEnvOptions),
				url(urlOptions),
				nesting,
				postcssMixins(mixinOptions),
				autoprefixer,
				csso(cssoOptions),
				reporter(reporterOptions)
			];
			break;
		case "development":
			plugins = [
				postcssImport(fileImportOptions),
				lightningcss(lightningcssOptions),
				postcssMixins(mixinOptions),
				stylelint(stylelintOptions),
				reporter(reporterOptions)
			];
			break;
		default:
			console.log("no plugins");
	}

	return {
		plugins: plugins
	};
};
