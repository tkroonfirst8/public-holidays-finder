import primeui from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
  // other settings
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [primeui],
}
