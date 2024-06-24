/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ///BRAND
        "primary-color": "#374BF6",
        "primary-color-gradient": "#B8E4F3",
        "secondary-color": "#E84855",
        "secondary-color-gradient": "#CBC6E4",
        //NEUTRO
        "title-color": "#000000",
        "text-color": "#1B2F3A",
        "placeholder-color": "#7DA2A2",
        "menu-color": "#EFF9FC",
        //STATUS
        //available Green
        available: "#3EB773",
        "secondary-available": "#A2DCBC",
        "tertiary-available": "#C4E9D5",
        //Caution Yellow
        warning: "#FFA209",
        "secondary-warning": "#FFD083",
        "tertiary-warning": "#FFE3B4",
        //Critical Red
        error: "#E84855",
        "secondary-error": "#F8C7CB",
      },
      fontFamily: {
        signika: ["Signika Negative"],
        overpass: ["Overpass"],
      },
    },
  },
  plugins: [],
}

