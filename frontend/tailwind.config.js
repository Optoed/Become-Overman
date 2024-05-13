/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		extend: {},
	},
	plugins: [],

	// Еще нужно будет добавить что-то в vite.config.js

	// corePlugins: {
	// 	preflight: false, //Нужно для того, чтобы не конфликтовали Ant Design и Tailwind
	// },
};
