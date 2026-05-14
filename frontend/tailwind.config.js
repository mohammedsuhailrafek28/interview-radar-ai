module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B1020',
        primary: '#7C4DFF',
        accent: '#00D1FF',
        success: '#00E676',
        danger: '#FF5252'
      },
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [],
}
