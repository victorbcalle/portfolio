import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useScrollProgress } from '../hooks/useScrollProgress';
import RotatingPanel, { panelGlass } from './RotatingPanel';
import SceneDepth from './SceneDepth';

// ── Tunables del efecto cenital ────────────────────────────────────────────
const PERSPECTIVE_PX = 1400; // distancia de cámara (menor = más dramático).
const RADIUS_PX = 380; // radio del anillo / profundidad en Z entre caras.
const ENTRY_TILT_DEG = 90; // inclinación inicial: la cámara mira al cielo.
const ENTRY_SCROLL = '200vh'; // recorrido de scroll que endereza la cámara.
// Velocidad de giro de la cámara (rotateY). Conservador a propósito: lento y
// sin rebote (damping alto). Subir `stiffness` lo hace más rápido.
const CAMERA_SPRING = { stiffness: 50, damping: 20, mass: 1 } as const;
const SWIPE_THRESHOLD_PX = 50; // desplazamiento mínimo para contar como swipe.
// ───────────────────────────────────────────────────────────────────────────

type SceneProps = {
  items: ReactNode[];
  /** Con `false` (móvil o reduced-motion) se aplana: lista vertical, sin 3D. */
  enabled: boolean;
};

/**
 * Escena del efecto cenital. Dos fases:
 *  1. ENTRADA (eje X): `rotateX` 90°→0° ligado al scroll endereza la cámara.
 *  2. NAVEGACIÓN (eje Y): ←/→, teclado y swipe giran la cámara entre las caras
 *     del anillo (gira la escena 3D, no un carrusel plano).
 * El nesting perspective → tilt → rotator es estructural: cada capa aísla un
 * eje de transform, no es decoración.
 */
export default function Scene({ items, enabled }: SceneProps) {
  const { t } = useTranslation();
  const count = items.length;
  const angleStep = 360 / count;

  // ENTRADA: progreso de scroll del sentinela → inclinación de la cámara.
  const entryRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(entryRef, ['start start', 'end end']);
  const rotateX = useTransform(progress, [0, 1], [ENTRY_TILT_DEG, 0]);

  // NAVEGACIÓN: índice sin límite (anillo infinito) y giro suave de la cámara.
  const [index, setIndex] = useState(0);
  const cameraRotateY = useSpring(0, CAMERA_SPRING);
  useEffect(() => {
    cameraRotateY.set(-index * angleStep);
  }, [index, angleStep, cameraRotateY]);

  // Teclado: ←/→ giran la cámara. ↑/↓ se dejan al scroll (entrada).
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setIndex((i) => i + 1);
      } else if (event.key === 'ArrowLeft') {
        setIndex((i) => i - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled]);

  // Swipe horizontal → gira; el vertical se deja al scroll de entrada.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (event: ReactTouchEvent) => {
    const touch = event.touches[0];
    if (touch) {
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    }
  };
  const onTouchEnd = (event: ReactTouchEvent) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) {
      return;
    }
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD_PX) {
      setIndex((i) => (dx < 0 ? i + 1 : i - 1));
    }
  };

  // Fallback anti-mareo: nombre + paneles apilados, scroll nativo, sin 3D, sin
  // rotaciones ni cuadrícula. Es la rama que ven móvil y reduced-motion.
  if (!enabled) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-6 py-24">
        <header className="text-center">
          <p className="mb-4 font-mono text-sm text-ink-muted" aria-hidden>
            <span className="text-accent">$</span> whoami
          </p>
          <h1 className="font-sans text-5xl font-semibold tracking-tight text-ink sm:text-7xl">
            {t('common.name')}
          </h1>
          <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.3em] text-accent">
            {t('hero.role')}
          </p>
        </header>
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex min-h-[40vh] items-center justify-center ${panelGlass}`}
          >
            {item}
          </div>
        ))}
      </div>
    );
  }

  const active = ((index % count) + count) % count;

  return (
    <>
      {/* Sentinela invisible: da recorrido de scroll a la ENTRADA. */}
      <div ref={entryRef} style={{ height: ENTRY_SCROLL }} aria-hidden />

      {/* Cámara fija con la perspectiva. */}
      <div
        className="fixed inset-0 grid place-items-center overflow-hidden"
        style={{ perspective: `${PERSPECTIVE_PX}px` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Capa de inclinación (entrada, eje X). */}
        <motion.div
          className="relative [transform-style:preserve-3d]"
          style={{ rotateX, willChange: 'transform' }}
        >
          {/* Cara superior: el nombre mira al cielo en la entrada (rotateX 90°)
              y se mantiene centrado en el viewport durante toda la entrada,
              alineado con la primera instancia en la que solo se ve el nombre.
              Va aquí, fuera del rotator, para que NO gire con la navegación en Y.
              Sin translateZ: a la altura del centro del anillo queda centrado;
              al enderezarse la cámara recede de canto y dejan paso los paneles. */}
          <div
            className="absolute left-1/2 top-1/2 flex flex-col items-center justify-center gap-3 whitespace-nowrap [backface-visibility:hidden]"
            style={{
              width: 760,
              height: 220,
              marginLeft: -380,
              marginTop: -110,
              transform: 'rotateX(-90deg)',
            }}
          >
            <p className="font-mono text-sm text-ink-muted" aria-hidden>
              <span className="text-accent">$</span> whoami
            </p>
            <h1 className="font-sans text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
              {t('common.name')}
            </h1>
            <p className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.3em] text-accent">
              {t('hero.role')}
              <span
                aria-hidden
                className="caret-blink inline-block h-4 w-2 bg-accent align-middle"
              />
            </p>
          </div>

          {/* Capa de cámara (navegación, eje Y): gira el anillo entero. */}
          <motion.div
            className="relative h-[58vh] max-h-[33rem] w-[76vw] max-w-[40rem] [transform-style:preserve-3d]"
            style={{ rotateY: cameraRotateY, willChange: 'transform' }}
          >
            {/* Pistas de profundidad: dentro del anillo, rotan con la cámara. */}
            <SceneDepth />

            {items.map((item, i) => (
              <RotatingPanel key={i} index={i} count={count} radius={RADIUS_PX}>
                {item}
              </RotatingPanel>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Controles de navegación. */}
      <nav className="fixed inset-x-0 bottom-8 z-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => setIndex((i) => i - 1)}
          aria-label={t('scene.prev')}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-xl leading-none text-ink transition-colors hover:border-white/40 focus-visible:border-accent"
        >
          ‹
        </button>
        <span className="text-sm tabular-nums text-ink-muted" aria-live="polite">
          {active + 1} / {count}
        </span>
        <button
          type="button"
          onClick={() => setIndex((i) => i + 1)}
          aria-label={t('scene.next')}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-xl leading-none text-ink transition-colors hover:border-white/40 focus-visible:border-accent"
        >
          ›
        </button>
      </nav>
    </>
  );
}
