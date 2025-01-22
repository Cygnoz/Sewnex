// Path: tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(128.45deg, #FFE8C0 0.21%, #B5DBDB 114.69%)',
        'custom-gradient2': 'linear-gradient(133.34deg, #FFD07B -13.05%, #8AE4B8 138.88%)',
      },
      colors: {
        
        heading:"#0B1320",
        subHeading:"#818894",

        primary_main: '#0EBB67',
        primary_hover: '#097D44',
        primary_active: '#075E33',
        primary_disabled: '#DBF8EA',

        secondary_main: '#E7FAF1',
        secondary_hover: '#DBF8EA',
        secondary_active: '#075E33',
        secondary_disabled: '#B5F0D3',

        tertiary_main: '#FAF2E6',
        tertiary_hover: '#F7ECD9',
        tertiary_active: '#EED8B0',
        tertiary_disabled: '#FFFFFF',

        fourthiary_main: '#C88000',
        fourthiary_hover: '#B47300',
        fourthiary_active: '#966000',
        fourthiary_disabled: '#F7ECD9',
       
        outlineButton_tertiary: "#966000",
        outlineButton_secondary: "#0B9C56",


        text_primary:"#303F58",
        text_secondary:"#4B5C79",
        text_tertiary:"#495160"

      },
  
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      })
    }
  ],
}
