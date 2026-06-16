# Portfolio — Víctor Calle

Portfolio personal. Vite + React + TypeScript + Tailwind CSS.

> Estado actual: **Bloque 0** — scaffold, tooling y deploy en blanco. Sin i18n,
> sin animaciones ni secciones de contenido todavía.

## Requisitos

- Node.js >= 18
- npm

## Arranque

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
```

## Build

```bash
npm run build    # type-check + bundle de producción en /dist
npm run preview  # sirve /dist localmente para verificar el build
```

## Otros scripts

```bash
npm run lint     # ESLint (objetivo: cero warnings)
npm run format   # Prettier sobre src y archivos raíz
```

## Stack y tokens

- **Tailwind**: tokens de paleta en [`tailwind.config.js`](tailwind.config.js)
  (`bg-base`, `surface-glass`, `accent`, `ink`).
- **Accesibilidad**: hook [`useReducedMotion`](src/hooks/useReducedMotion.ts) y
  media queries base en [`src/styles/global.css`](src/styles/global.css) que
  respetan `prefers-reduced-motion`.
- `framer-motion` y `lenis` están instalados pero aún no se usan.
