export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': '#20B2AA',
        'primary-hover': '#1a9d96',
        'dark-bg': '#2a2a2a',
        'card-bg': '#1f1f1f',
        'border-gray': '#404040',
      },
      boxShadow: {
        'elegant': '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
        'elegant-lg': '0 8px 32px -4px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
