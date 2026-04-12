/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        carbon: '#171A20',
        graphite: '#393C41',
        pewter: '#5C5E62',
        fog: '#8E8E8E',
        blue: '#3E6AE1',
        ash: '#F4F4F4',
        cloud: '#EEEEEE',
        silver: '#D0D1D2',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Arial', 'sans-serif'],
      },
      transitionDuration: {
        330: '330ms',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
