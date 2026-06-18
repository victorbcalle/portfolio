// Estrellas tenues: posiciones deterministas [x, y, z] en px del mundo 3D, para
// que el render sea estable y no se recalcule. Dispersas sobre todo en Z, dan
// parallax al girar la cámara (referencia de profundidad).
const STARS: ReadonlyArray<readonly [number, number, number]> = [
  [-560, -360, -640],
  [480, -420, -320],
  [-300, 280, -540],
  [620, 180, -180],
  [-680, 60, -260],
  [120, -480, -700],
  [360, 420, -420],
  [-200, -160, -780],
  [700, -80, -500],
  [-440, 360, -120],
  [240, 260, -660],
  [-120, -300, -360],
  [540, -260, -740],
  [-620, -440, -200],
  [80, 460, -560],
  [420, 40, -300],
];

const GRID_LINES =
  'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),' +
  'linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)';
const GRID_FADE = 'radial-gradient(circle at center, #000 0%, transparent 65%)';

/**
 * Pistas de profundidad de la escena cenital. Vive DENTRO del anillo (rotator),
 * así que rota con la cámara en X (entrada) y en Y (navegación): al enderezarse
 * la cuadrícula barre del cielo al frente y al girar se nota el desplazamiento.
 * Solo pinta (gradiente + puntos); el movimiento lo da el transform del padre,
 * sin coste por frame. Todo muy oscuro y sutil, coherente con la estética dark.
 */
export default function SceneDepth() {
  return (
    <>
      {/* Suelo en perspectiva: cuadrícula tenue tumbada bajo los paneles. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[2400px] w-[2400px]"
        style={{
          marginLeft: -1200,
          marginTop: -1200,
          transform: 'translateY(420px) rotateX(90deg)',
          backgroundImage: GRID_LINES,
          backgroundSize: '120px 120px',
          maskImage: GRID_FADE,
          WebkitMaskImage: GRID_FADE,
        }}
      />

      {/* Estrellas distribuidas en profundidad. */}
      {STARS.map(([x, y, z], i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[3px] w-[3px] rounded-full bg-white/20"
          style={{ transform: `translate3d(${x}px, ${y}px, ${z}px)` }}
        />
      ))}
    </>
  );
}
