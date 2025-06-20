/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-900': '#0A0F1F',
        'space-800': '#141A2F',
        'space-700': '#1E2745',
        'navy-900': '#0B1120',
        'neon-purple': '#A855F7',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  }
}

  



