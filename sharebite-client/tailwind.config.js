/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      screens: {
          sm: "576px",
          md: "768px",
          lg: "992px",
          xl: "1270px",
      },
      fontFamily: {
          primary: ['"Poppins"'],
      },
      fontSize: {
          xs: [".75rem", "1rem"],
          sm: [".875rem", "1.25rem"],
          tiny: ["15px", "1.05rem"],
          base: ["1rem", "1.5rem"],
          lg: ["1.125rem", "1.75rem"],
          xl: ["1.25rem", "1.75rem"],
          "2xl": ["1.5rem", "2rem"],
          "3xl": ["1.875rem", "2.25rem"],
          "4xl": ["2.25rem", "2.5rem"],
          "5xl": ["3rem", "3.5rem"],
          "6xl": ["3.75rem", "4.5rem"],
          "7xl": ["4.5rem", "5rem"],
      },
      extend: {
          colors: {
              transparent: "transparent",
              primary: "#EA4335",
              secondary: "#F9D301",
              heading: "#26314F",
              default: "#1C2130",
              background: "#B9C2D8",
          },
          typography: (theme) => ({
              DEFAULT: {
                  css: {
                      "h1, h2, h3, h4, h5, h6": {
                          color: theme("colors.heading"),
                          fontWeight: "bold",
                      },
                      h1: {
                          fontSize: "48px",
                      },
                      h2: {
                          fontSize: "36px",
                      },
                      h3: {
                          fontSize: "30px",
                      },
                      h4: {
                          fontSize: "24px",
                      },
                      h5: {
                          fontSize: "20px",
                      },
                      h6: {
                          fontSize: "18px",
                      },
                      p: {
                          fontSize: "20px",
                      },
                      maxWidth: {
                          prose: "100%",
                      },
                  },
              },
          }),
      },
  },
  plugins: [require("daisyui")],
};
