import { useScroll, type MotionValue } from 'framer-motion';
import type { RefObject } from 'react';

// Tipo del `offset` derivado de la propia firma de useScroll: así aceptamos
// solo combinaciones válidas sin depender de un export interno de framer.
type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>['offset'];

/**
 * Progreso de scroll de un elemento como MotionValue de 0 a 1. Por defecto
 * mide su paso por el viewport (`start end` → `end start`), pero el `offset`
 * es configurable: la ENTRADA del efecto cenital lo usa con `start start` →
 * `end end` para mapear el enderezado de la cámara.
 *
 * Devolver un MotionValue (y no un number de estado) es deliberado: Framer
 * escribe los transforms enlazados en su propio rAF, sin provocar un re-render
 * de React por cada frame de scroll. Es la base del rendimiento del efecto.
 */
export function useScrollProgress(
  target: RefObject<HTMLElement>,
  offset: ScrollOffset = ['start end', 'end start'],
): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target, offset });
  return scrollYProgress;
}
