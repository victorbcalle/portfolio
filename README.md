# Portfolio — Víctor Boluda Calle

Portfolio personal. Efecto principal: cámara cenital (top-down) que desciende con
el scroll y revela paneles de cristal que rotan en `rotateY` al entrar en
viewport. Estética Apple dark/glass + acento JDM. Bilingüe ES/EN.

> **Regla de oro:** cada bloque = 1 sesión. Cada sesión termina compilando y con
> algo visible. No adelantar trabajo de bloques futuros. No tocar lo ya cerrado
> salvo bug.

## Stack

Vite · React · TypeScript (strict) · Tailwind · Framer Motion · Lenis ·
react-i18next · Vercel.

**NO Three.js**: el efecto 3D se hace con CSS (`perspective`, `rotateY`,
`transform-style: preserve-3d`) + parallax. Prioridad absoluta: rendimiento
(objetivo Lighthouse 90+).

## Arranque

Requisitos: Node.js >= 18 y npm.

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
```

```bash
npm run build    # type-check + bundle de producción en /dist
npm run preview  # sirve /dist localmente para verificar el build
npm run lint     # ESLint (objetivo: cero warnings)
npm run format   # Prettier sobre src y archivos raíz
```

## Reglas transversales

- Animar SOLO `transform` y `opacity`. Nunca `top/left/width`.
- `prefers-reduced-motion` y `<768px`: desactivan rotaciones/parallax pesado.
- `will-change` solo en elementos animándose activamente.
- Imágenes WebP/AVIF + lazy-load (`IntersectionObserver`).
- Textos vía claves i18n, nunca strings sueltos. Cero warnings de lint.

## Estructura

```
src/
  components/   Scene, RotatingPanel, Hero, Projects, Stack, Contact
  hooks/        useScrollProgress, useReducedMotion
  data/         projects.ts (tipado)
  i18n/         es.json, en.json
  styles/
```

### Tokens y accesibilidad (ya en sitio desde el Bloque 0)

- **Tailwind**: tokens de paleta en [`tailwind.config.js`](tailwind.config.js)
  (`bg-base`, `surface-glass`, `accent`, `ink`).
- **Accesibilidad**: hook [`useReducedMotion`](src/hooks/useReducedMotion.ts) y
  media queries base en [`src/styles/global.css`](src/styles/global.css) que
  respetan `prefers-reduced-motion`.
- `framer-motion` y `lenis` están instalados pero aún no se usan.

## Bloques (sesiones)

| #   | Bloque                         | Entregable                                                                   | Estado |
| --- | ------------------------------ | ---------------------------------------------------------------------------- | ------ |
| 0   | Scaffold + tooling             | App arranca, fondo dark, nombre centrado, deploy en blanco a Vercel          | ✅     |
| 1   | i18n ES/EN                     | Toggle idioma + persistencia localStorage + JSON estructurado vacío          | ⬜     |
| 2   | Efecto cenital + RotatingPanel | Scene + useScrollProgress + panel giratorio glass, 3-4 dummies a 60fps móvil | ⬜     |
| 3   | Hero / Sobre mí                | Sección real, nombre emergiendo, bio bilingüe                                | ⬜     |
| 4   | Proyectos                      | data/projects.ts + grid de paneles, contenido real bilingüe, lazy-load       | ⬜     |
| 5   | Stack + Contacto               | Panel de tecnologías + CTA/links (GitHub, LinkedIn, email) + footer          | ⬜     |
| 6   | Pulido + perf + SEO            | Lighthouse 90+, meta/OG, favicon, lang dinámico, code splitting              | ⬜     |

Flujo: `0 → 1 → 2 (mayor riesgo) → 3 → 4 → 5 → 6`. El 2 es el corazón y debe
validarse antes de invertir en contenido.

> Bloque 0 cerrado: el repo arranca, compila y está listo para Vercel. Conectar
> el repo a Vercel es un paso manual (ver más abajo) pendiente por tu parte.

## Notas

- Prioridad de secciones: 1.Sobre mí · 2.Proyectos · 3.Stack · 4.Contacto.
- Proyectos: ShiftBot, CodeGuard, QES, Viral Factory. **QES es trabajo de
  cliente** — usar versión genérica sin nombrar al cliente.
- GitHub: github.com/victorbcalle

## Deploy en Vercel

Sube el repo a GitHub y luego, en vercel.com → **Add New… → Project** →
**Import Git Repository**. Vercel detecta Vite automáticamente:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

Cada `git push` a `main` redespliega; cada PR genera un preview deployment.

## Cómo trabajar este repo (para Claude Code)

Al empezar una sesión: lee este README, identifica el bloque activo (primer ⬜),
trabaja SOLO ese bloque. Al terminar: marca ✅ en la tabla y resume archivos
tocados.
