/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#3b82f6",
          600: "#2563eb",
        },
        dark: {
          100: "#1f2937",
          200: "#111827",
          300: "#0f172a",
        },
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [],
};