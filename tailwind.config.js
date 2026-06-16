/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Fondo base oscuro tipo "Apple dark": casi negro con un punto de azul/gris.
        base: '#0a0a0c',
        // Superficie glass: blanco a baja opacidad (combinar con backdrop-blur más adelante).
        surface: {
          glass: 'rgb(255 255 255 / 0.05)',
        },
        // Acento JDM: rojo vibrante.
        accent: {
          DEFAULT: '#ff2d2d',
        },
        // Texto: blanco roto / gris claro.
        ink: {
          DEFAULT: '#f5f5f7',
          muted: '#a1a1aa',
        },
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
