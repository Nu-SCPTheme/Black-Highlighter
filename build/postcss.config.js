"use strict";

module.exports = (ctx) => {

	const path = require("path");
	const stylelint = require("stylelint");
	const postcssImport = require("postcss-import");
	const postcssMixins = require("postcss-mixins");
	const reporter = require("postcss-reporter");
	//const mqPacker = require("@hail2u/css-mqpacker");
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
				},
				Rule: {
					import(rule) {
						nodeEnv === "development" || !rule.value.url.includes("../") ? [
							rule.value.url
						] : [
							rule.value.url = "../" + rule.value.url
						];
						return rule;
					}
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
		case "production":
			plugins = [
				postcssImport(fileImportOptions),
				lightningcss(lightningcssOptions),
				postcssMixins(mixinOptions),
				//mqPacker,
				reporter(reporterOptions)
			];
			break;
		case "development":
			plugins = [
				postcssImport(fileImportOptions),
				lightningcss(lightningcssOptions),
				postcssMixins(mixinOptions),
				//mqPacker,
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
