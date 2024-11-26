/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: { max: "640px" },
      // => @media (max-width: 640px) { ... }
      mdsm: "641px",
      // => @media (min-width: 641px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    colors: {
      primary: "#E54B4B",
      textcolor: "#8492A6",
      text: "#3C4858",
      white: "#fff",
      textblack: "#161D2D",
      offwhit: "FFFAFA",
      gray: "#1f2937",
      bordercolor: "#e9ecef",
      red: "#FF0000",
      background: "var(--background)",
    },
    fontSize: {
      tiny: "12px",
      sm: "14px",
      base: "16px",
      h6: "18px",
      h5: "20px",
      h4: "22px",
      h3: "24px",
      h2: "26px",
      h1: "28px",
      xl: "30px",
      "2xl": "32px",
      "3xl": "34px",
      "4xl": "36px",
      "5xl": "38px",
      "6xl": "40px",
      "7xl": "42px",
    },
    extend: {},
  },
  plugins: [],
};
