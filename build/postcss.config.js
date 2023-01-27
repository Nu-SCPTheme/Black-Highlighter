module.exports = {
	plugins: [		
		require("stylelint")({
			ignoreDisables: true,
		}),	
		require("postcss-import"),		
		require("postcss-url")({ url: "copy" }),		
		require("postcss-preset-env")({
			stage: 1,
			features: {
				"is-pseudo-class": false,
				"not-pseudo-class": false,
				"nesting-rules": [
					true,
					{
						noIsPseudoSelector: false,
					}
				]
			}
		}),		
		require("postcss-reporter")({
			throwError: false,
			clearReportedMessages: true,
			clearAllMessages: true,
			plugins: ["stylelint"],
		}),
		require("@hail2u/css-mqpacker"),		
		require("autoprefixer"),
	],
};
