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
				mono: ['JetBrains Mono', 'ui-monospace', 'Menlo', 'SFMono-Regular', 'monospace'],
			},
			colors: {
				'text': 'rgb(from var(--text) r g b / <alpha-value>)',
				'background': 'rgb(from var(--background) r g b / <alpha-value>)',
				'primary': 'rgb(from var(--primary) r g b / <alpha-value>)',
				'secondary': 'rgb(from var(--secondary) r g b / <alpha-value>)',
				'accent': 'rgb(from var(--accent) r g b / <alpha-value>)',
			},
      scale: {
        120: '1.2',
        130: '1.3',
        140: '1.4',
      },
		},
	},
	plugins: [],
}