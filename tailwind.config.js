/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Fondo base oscuro tipo "Apple dark": casi negro con un punto de azul/gris.
        // OJO: no llamarlo `base` — colisiona con la utilidad de tamaño
        // `text-base` de Tailwind y pisaría el color del texto.
        night: '#0a0a0c',
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
        // Cara de display/utilidad: identidad "terminal" del CV. Stack de
        // monoespaciadas del sistema (SF Mono en Mac, Cascadia/Consolas en
        // Windows) — cero dependencias y cero coste de red para Lighthouse.
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'SF Mono',
          'JetBrains Mono',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};
