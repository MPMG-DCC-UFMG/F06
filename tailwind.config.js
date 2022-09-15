module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#F15A24"
      },
      height: {
        lateral: "calc(100vh - 64px)"
      }
    },
  },
  plugins: [],
}
