module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0F1C',
        surface: '#111827',
        primary: '#00D1FF',
        accent: '#22C55E',
        success: '#22C55E',
        danger: '#FF4D4F',
        text: '#F3F4F6'
      },
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [],
}
