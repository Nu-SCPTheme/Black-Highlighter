"use strict";

module.exports = (ctx) => {

	const path = require("path");
	const globalData = require("@csstools/postcss-global-data");
	const stylelint = require("stylelint");
	const postcssImport = require("postcss-import");
	const postcssMixins = require("postcss-mixins");
	const presetEnv = require("postcss-preset-env");
	const autoprefixer = require("autoprefixer");
	const url = require("postcss-url");
	const csso = require("postcss-csso");
	const reporter = require("postcss-reporter");
	const browserslist = require("../package.json").browserslist;

	/* Disabling LightningCSS until its functionality is a little more robust
	const lightningcss = require("postcss-lightningcss");
	*/

	const nodeEnv = ctx.env;
	const dev = nodeEnv === "development";

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
