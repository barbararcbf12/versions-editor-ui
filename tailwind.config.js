/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1920px",
    },
    fontSize: {
      10: "0.625rem",
      11: "0.688rem",
      12: "0.75rem",
      13: "0.813rem",
      14: "0.875rem",
      base: "1rem", // 16px
      20: "1.25rem",
      22: "1.375rem",
      24: "1.5rem",
      28: "1.75rem",
      32: "2rem",
      40: "2.5rem",
      48: "3rem",
      64: "4rem",
      72: "4.5rem",
    },
    borderRadius: {
      xs: "0.5rem",
      sm: "0.75rem",
      md: "1rem",
      lg: "2rem",
      full: "9999px",
    },
    colors: {
      white: "#ffffff",
      gray: {
        "200": "#F2F4F7",
        "300": "#EAECF0",
        "400": "#D0D5DD"
      },
      border: {
        subtle: "#FFFFFF",
        light: "#EAECF0",
        main: "#D0D5DD",
        dark: "#344054",
        brand: "#444CE7",
        warning: "#DC7E03",
        error: "#D92D20",
        success: "#079455",
      },
      error: {
        subtle: "#FEF3F2",
        light: "#FECDCA",
        main: "#D92D20",
        dark: "#912018",
      },
      warning: {
        subtle: "#FFF6EB",
        light: "#FECB89",
        main: "#DC7E03",
        dark: "#93590D",
      },
      success: {
        subtle: "#ECFDF5",
        light: "#ABEFD0",
        main: "#079455",
        dark: "#085D37",
      },
      neutral: {
        subtle: "#98A3B3",
        light: "#667085",
        main: "#344054",
        dark: "#000000",
      },
      brand: {
        subtle: "#E0E2FF",
        light: "#8086F9",
        main: "#444CE7",
        dark: "#353DCD",
      },
      surface: {
        subtle: "#FCFCFD",
        light: "#FFFFFF",
        main: "#F9FAFB",
        dark: "#F2F4F7",
      },
    },
    boxShadow: {
      global: "0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
      "elevation-01": "0 1px 10px 0 rgba(11,13,22,0.12)",
      "elevation-02": "0 8px 16px 0 rgba(11,13,22,0.14)",
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // 'Inter' will be used as the default sans font
      },
      lineHeight: {
        '2.5': '0.688rem', //11px
        '3.5': '0.875rem', //14px
        '4.5': '1.063rem', //17px
        '4.75': '1.188rem', //19px
        '5.5': '1.375rem', //22px
        '7.5': '1.938rem', //31px
      }
    },
  },
  plugins: [],
};
