import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['"Phantom Sans"', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				brand: {
					red: "#ec3750",
					orange: "#ff8c37",
				},
			},
			animation: {
				"spin-slow": "spin 60s linear infinite",
			},
		}
	},

	plugins: []
} as Config;
