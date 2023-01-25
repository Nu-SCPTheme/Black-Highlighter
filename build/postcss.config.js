module.exports = {
	plugins: [
		require('stylelint'),
		require('postcss-reporter')({ clearReportedMessages: true }),
		require('postcss-import'),
		require('postcss-url')({ url: 'copy' }),
		require('autoprefixer'),
		require('postcss-preset-env')({stage: 1}),
		require('@hail2u/css-mqpacker'),
	],
};
