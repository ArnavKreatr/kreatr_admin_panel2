/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        dark:"#373737",
        light:"#F0F0F0"
      },
      backgroundColor:{
        dark:"#373737",
        light:"#F0F0F0",
        cardbg:"#D6D6D6"
      }
    },
  },
  plugins: [],
};
