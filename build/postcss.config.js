"use strict";

module.exports = (ctx) => {

	const path = require("path");
	const stylelint = require("stylelint");
	const postcssImport = require("postcss-import");
	const reporter = require("postcss-reporter");
	const mqPacker = require("@hail2u/css-mqpacker");
	const lightningcss = require("postcss-lightningcss");
	const browserslist = require("../package.json").browserslist;

	const nodeEnv = ctx.env;

	const stylelintOptions = {
		configFile: path.join(__dirname, "../.stylelintrc"),
		fix: nodeEnv === "development" ? true : false
	};

	const lightningcssOptions = ({
		filename: path.join(ctx.file.dirname, "/", ctx.file.basename),
		browsers: browserslist,
		lightningcssOptions: {
			projectRoot: ctx.file.dirname,
			inputSourceMap:
				path.join(
					ctx.file.dirname,
					nodeEnv === "production" ?
						"/black-highlighter.css.map" :
						"/min/black-highlighter.min.css.map"),
			minify: nodeEnv === "development" ? false : true,
			sourceMap: false,
			errorRecovery: false,
			drafts: {
				nesting: true,
				customMedia: true
			},
			visitor: {
				Url(url) {
					nodeEnv === "development" || !url.url.includes("../") ? [
						url.url
					] : [
						url.url = "../" + url.url
					];
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
		case "watching":
			plugins = [
				lightningcss(lightningcssOptions),
				reporter(reporterOptions)
			];
			break;
		case "production":
			plugins = [
				postcssImport,
				lightningcss(lightningcssOptions),
				mqPacker,
				reporter(reporterOptions)
			];
			break;
		case "development":
			plugins = [
				postcssImport,
				lightningcss(lightningcssOptions),
				stylelint(stylelintOptions),
				reporter(reporterOptions)
			];
			break;
		default:
			console.log("no plugins");
	}

	return {
		map: { inline: false },
		plugins: plugins
	};
};
