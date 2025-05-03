const { DEFAULT_EXTENSIONS } = require('@babel/core');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily : {
        rubik: ['Rubik', 'sans-serif'],
        "rubik-bold": ['Rubik-Bold', 'sans-serif'],
        "rubik-medium": ['Rubik-Medium', 'sans-serif'],
        "rubik-regular": ['Rubik-Regular', 'sans-serif'],
        "rubik-light": ['Rubik-Light', 'sans-serif'],
        "rubik-semibold": ['Rubik-SemiBold', 'sans-serif'],
        "rubik-extrabold": ['Rubik-ExtraBold', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Merriweather', 'serif'],
        'mono': ['Menlo', 'monospace'],
      },
      colors: {
        "primary": {
          100: '#0061FF0A',
          200: '#0061FF1A',
          300: '#0061FF'
        },
        accent: {
          100: '#FBFBFD'
        },
        black: {
          DEFAULT: '#000000',
         100: '#8C8E98',
         200: '#666876',
         300: "#191D31"
        },
        danger: '#F755555',
        yellow: {
          DEFAULT: "#FBBC05",
          100: "#F2D476", 
        },
        background: '#E7EDF4',
        disable: "#EDEDED",
        enable: "#FFD700"
      }
    },
  },
  plugins: [],
}