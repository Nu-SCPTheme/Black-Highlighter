"use strict";

module.exports = (ctx) => {

	const path = require("path");
	const stylelint = require("stylelint");
	const postcssImport = require("postcss-import");
	//const postcssURL = require("postcss-url");
	const reporter = require("postcss-reporter");
	const mqPacker = require("@hail2u/css-mqpacker");
	const lightningcss = require("postcss-lightningcss");
	const browserslist = require("../package.json").browserslist;

	const stylelintOptions = {
		configFile: path.join(__dirname, "../.stylelintrc"),
		fix: process.env.NODE_ENV === "production" ? false : true
	};

	const lightningcssOptions = ({
		filename: path.join(ctx.file.dirname, "/", ctx.file.basename),
		browsers: browserslist,
		lightningcssOptions: {
			projectRoot: ctx.file.dirname,
			inputSourceMap: path.join(ctx.file.dirname, process.env.NODE_ENV === "production" ? "/black-highlighter.css.map" : "/min/black-highlighter.min.css.map"),
			minify: process.env.NODE_ENV === "production" ? true : false,
			sourceMap: false,
			errorRecovery: false,
			drafts: {
				nesting: true,
				customMedia: true
			},
			visitor: {
				Url(url) {
					process.env.NODE_ENV === "production" ? [url.url = "../" + url.url] : [url.url];
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

	return {
		map: { inline: false },
		plugins:
			process.env.NODE_ENV === "production" ? [
				postcssImport,
				lightningcss(lightningcssOptions),
				//postcssURL(postcssURLOptions),
				//mqPacker,
				reporter(reporterOptions)
			] : [
				postcssImport,
				lightningcss(lightningcssOptions),
				stylelint(stylelintOptions),
				//postcssURL(postcssURLOptions),
				//mqPacker,
				reporter(reporterOptions)
			]
	};
};
