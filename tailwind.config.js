/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"IBM Plex Sans"', 'sans-serif'],
			},
			fontSize: {
				10: '10px',
				13: '13px',
			},
			lineHeight: {
				12: '12px',
				20: '20px',
			},
			colors: {
				tprimary: '#202932',
				tsecondary: '#5F6E7C',
				terror: '#E40808',
				accent: '#005CB2',
				stroke: '#EAEDF0',
				bgprimary: '#F7F7F8',
				icon: '#687684',
				iconDisabled: '#C8CFD5',
				done: '#D2FFCE',
				wrong: '#FEDBDB',
				alert: '#FEF0DB',
			},
			boxShadow: {
				m: '0px 0px 20px 0px rgba(37, 45, 52, 0.10)',
			},
		},
	},
	plugins: [],
}
