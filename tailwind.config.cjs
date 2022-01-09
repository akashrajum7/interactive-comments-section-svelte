module.exports = {
	content: ['./src/**/*.html', './src/**/*.svelte'],
	theme: {
		fontFamily: {
			sans: [
				'Rubik',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji'
			]
		},
		extend: {}
	},
	plugins: [require('@tailwindcss/forms')]
};
