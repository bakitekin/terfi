/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#059669",
        secondary: "#2563eb",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        muted: {
          DEFAULT: "#6b7280",
          light: "#f3f4f6",
        },
      },
    },
  },
  plugins: [],
};
