module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,js,svg,html}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};