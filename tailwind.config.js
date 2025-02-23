/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      animation: {
        'soft-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 243, 255, 0.3), 0 0 20px rgba(0, 243, 255, 0.2), 0 0 30px rgba(188, 19, 254, 0.2)',
      },
    },
  },
  plugins: [],
};