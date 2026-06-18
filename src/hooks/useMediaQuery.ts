import { useEffect, useState } from 'react';

/**
 * Suscripción reactiva a una media query. SSR-safe (devuelve `false` cuando no
 * hay `window`). Lo usamos para apagar el efecto 3D en pantallas estrechas,
 * donde el coste de las rotaciones/parallax no compensa.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== 'undefined' && 'matchMedia' in window
      ? window.matchMedia(query).matches
      : false,
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) {
      return;
    }
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
