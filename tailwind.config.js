/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0fa',  // Azul muy claro
          100: '#cce0f5',
          200: '#99c2eb',
          300: '#66a3e0',
          400: '#3385d6',
          500: '#0066cc',  // Azul base vibrante
          600: '#0054A6',  // [SGI AZUL] Color principal oficial
          700: '#004285',
          800: '#002D56',  // [SGI DARK] Azul oscuro institucional
          900: '#001a33',
          950: '#000d1a',
        },
        accent: {
          50: '#fffbea',  // Amarillo muy claro
          100: '#fff3c4',
          200: '#ffe685',
          300: '#ffd947',
          400: '#FFD100', // [SGI AMARILLO] Color secundario oficial
          500: '#e6bc00',
          600: '#b39200',
          700: '#E30613', // [SGI ROJO] Usado como acento fuerte/alerta (reemplazando tonos oscuros de amarillo)
          800: '#cc0511',
          900: '#99040d',
          950: '#660309',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
