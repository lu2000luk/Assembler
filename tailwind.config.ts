import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		colors: {
			'text': '#d2f0fe',
			'background': '#000a0e',
			'primary': '#72d0fd',
			'secondary': '#0204a1',
			'accent': '#5a0ffc',
			'error': '#ff0000',
			'warning': '#ff9900',
			'success': '#00ff00',
			'info': '#00ffff',
			'white': '#ffffff',
			'black': '#000000',
			'texts': {
				50: '#e6f7fe',
				100: '#cdeefe',
				200: '#9bdefd',
				300: '#69cdfc',
				400: '#37bdfb',
				500: '#05acfa',
				600: '#048ac8',
				700: '#036796',
				800: '#024564',
				900: '#012232',
				950: '#011119',
				},
			'backgrounds': {
				50: '#e5f8ff',
				100: '#ccf1ff',
				200: '#99e2ff',
				300: '#66d4ff',
				400: '#33c5ff',
				500: '#00b7ff',
				600: '#0092cc',
				700: '#006e99',
				800: '#004966',
				900: '#002533',
				950: '#00121a',
				},
			'primarys': {
				50: '#e6f7ff',
				100: '#cdeffe',
				200: '#9bdefd',
				300: '#68cefd',
				400: '#36bdfc',
				500: '#04adfb',
				600: '#038ac9',
				700: '#026897',
				800: '#024564',
				900: '#012332',
				950: '#001119',
				},
			'secondarys': {
				50: '#e6e6ff',
				100: '#cdcdfe',
				200: '#9a9cfe',
				300: '#686afd',
				400: '#3538fd',
				500: '#0307fc',
				600: '#0205ca',
				700: '#020497',
				800: '#010365',
				900: '#010132',
				950: '#000119',
				},
			'accents': {
				50: '#eee6ff',
				100: '#dccdfe',
				200: '#ba9afe',
				300: '#9768fd',
				400: '#7435fd',
				500: '#5203fc',
				600: '#4102ca',
				700: '#310297',
				800: '#210165',
				900: '#100132',
				950: '#080019',
				},
		},
	},

	plugins: [typography, forms, containerQueries, aspectRatio]
} satisfies Config;
