module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Nunito', 'Arial', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				title: ['Geologica', 'Helvetica', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['Cascadia Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
			},
			colors: {
				'text': 'var(--text)',
				'background': 'var(--background)',
				'primary': 'var(--primary)',
				'secondary': 'var(--secondary)',
				'accent': 'var(--accent)',
			},
		},
	},
	plugins: [],
}