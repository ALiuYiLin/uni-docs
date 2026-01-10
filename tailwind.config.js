/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  blocklist: ["container"],
  theme: {
    extend: {},
  },
  plugins: [],
}