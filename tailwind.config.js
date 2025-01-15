/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#0EBB67",
          hover: "#097D44",
          active: "#075E33",
          disabled: "#dcf8ea",
        },
        secondary: {
          default: "#e6faf1",
          hover: "#dcf8ea",
          active: "#b5f0d2",
          disabled: "#b4f1d2",
        },
        tertiary: {
          default: "#f7ecda",
          hover: "#f7ecda",
          active: "#eed8af",
          disabled: "#eed8af",
        },
        quaternary: {
          default: "#c78000",
          hover: "#b47201",
          active: "#966000",
          disabled: "#F7ECD9",
        },
        textPrimary:"#F7ECD9",
        textSecondary:"#818894",
        borderColor:"#CECECE"
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".hide-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
  ],
};
