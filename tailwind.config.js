module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at 20% 35%,rgb(17, 35, 80) 0%, #050B1D 40%, transparent 60%)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
      animation: {
        fadeIn: 'fadeIn 1.2s ease-out forwards'
      }
    },
  },
  plugins: [],
}