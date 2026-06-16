import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Devuelve `true` cuando el usuario ha pedido reducir el movimiento del sistema.
 *
 * Patrón de accesibilidad listo desde el día 1: las futuras animaciones
 * (Framer Motion, Lenis, efecto cenital...) deben consultar este hook y
 * desactivarse o suavizarse cuando devuelva `true`. Todavía no se anima nada.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }
    const mql = window.matchMedia(QUERY);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
