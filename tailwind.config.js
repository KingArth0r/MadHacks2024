/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation: {
        rotate360: 'rotate360 2s linear infinite'
      },
      keyframes: {
        rotate360: {
          '0%': { transform: 'rotate(0deg)'},
          '100%': { transform: 'rotate(360deg)'},
        }
      },
      colors: {
        cppDark: '#004482',
        cppBlue: '#00599C',
        cppLight: '#659AD2',
        darkGrey: '#121212'
      }
    },
  },
  plugins: [],
}

