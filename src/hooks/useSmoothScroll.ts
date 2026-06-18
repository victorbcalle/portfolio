import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Scroll suave global con Lenis mientras `enabled` sea true. Si el usuario pide
 * menos movimiento o estamos en móvil, no se monta y queda el scroll nativo.
 *
 * Framer `useScroll` lee la posición de scroll que Lenis va actualizando, así
 * que las rotaciones de los paneles siguen el scroll sin trabajo adicional.
 */
export function useSmoothScroll(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const lenis = new Lenis();
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [enabled]);
}
