// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './src/app/**/*.{js,ts,jsx,tsx}',
//     './src/components/**/*.{js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: '#1A1714',
//         accent: '#C4873A',
//         'accent-light': '#D9A05E',
//         bg: '#F7F3EE',
//         cream: '#FDFAF6',
//         sage: '#8A9080',
//       },
//       fontFamily: {
//         display: ['Fraunces', 'serif'],
//         sans: ['DM Sans', 'sans-serif'],
//       },
//       transitionTimingFunction: {
//         'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
//       },
//     },
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1714',
        accent: '#C4873A',
        'accent-light': '#D9A05E',
        bg: '#F7F3EE',
        cream: '#FDFAF6',
        sage: '#8A9080',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};