import type { ReactNode } from 'react';

/**
 * Estilo de cristal compartido por los paneles (escena 3D y fallback plano).
 * Un único elemento, sin cajas anidadas: borde tenue + fondo glass + blur solo
 * en pantallas anchas (el backdrop-blur repinta por frame y es caro en móvil).
 */
export const panelGlass =
  'overflow-hidden rounded-3xl border border-white/10 bg-surface-glass p-10 text-center md:backdrop-blur-md';

type RotatingPanelProps = {
  /** Posición en el anillo (0…count-1). */
  index: number;
  /** Número total de caras del anillo. */
  count: number;
  /** Radio del anillo en px: distancia de cada cara al centro de la cámara. */
  radius: number;
  children: ReactNode;
};

/**
 * Una cara del anillo 3D. Se coloca con `rotateY(i·paso) translateZ(radio)`
 * para mirar hacia afuera; quien gira es la cámara (ver Scene), no el panel.
 * Por eso su transform es estático: el movimiento lo da el giro de la escena.
 * `backface-visibility:hidden` evita ver el reverso de las caras alejadas.
 */
export default function RotatingPanel({
  index,
  count,
  radius,
  children,
}: RotatingPanelProps) {
  const angle = index * (360 / count);
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center [backface-visibility:hidden] ${panelGlass}`}
      style={{ transform: `rotateY(${angle}deg) translateZ(${radius}px)` }}
    >
      {children}
    </div>
  );
}
