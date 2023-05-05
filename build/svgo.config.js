module.exports = {
	multipass: true,
	plugins: [
		{
			name: "preset-default",
			params: {
				overrides: {
					removeDoctype: false,
					removeViewBox: false,
					removeXMLProcInst: false,
					cleanupNumericValues: {
						floatPrecision: 2
					}
				}
			}
		},
		"removeRasterImages",
		"reusePaths",
		"sortAttrs"
	]
};
