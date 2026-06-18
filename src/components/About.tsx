import { useTranslation } from 'react-i18next';

// Literales del motivo "terminal" (tomado del CV): no son contenido traducible,
// son iguales en cualquier idioma, así que viven como constantes, no en i18n.
const WINDOW_TITLE = 'victor@malaga: ~/sobre-mi';
const COMMAND = 'cat perfil.md';

// Filas de metadatos: pares clave/valor (estilo front-matter / printenv) que
// completan la intro sin pisar las secciones de Proyectos (B4) ni Stack (B5).
const META_ROWS = [
  'location',
  'education',
  'learning',
  'languages',
  'status',
] as const;

/**
 * Panel "Sobre mí": primera cara del anillo (índice 0) y primera sección del
 * fallback plano. Es solo contenido — el cristal y el centrado los aporta el
 * RotatingPanel que lo envuelve, que aquí hace de bisel de la "pantalla".
 *
 * Firma del bloque: la sección se presenta como una ventana de terminal (chrome
 * de tres puntos + prompt + output), la identidad de desarrollador del CV. El
 * cuerpo va en sans para legibilidad; mono solo en los elementos de terminal.
 */
export default function About() {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col text-left">
      {/* Barra de título a sangre: rompe el padding del panel (-mx/-mt-10) para
          pegarse a los bordes superiores como la barra de una ventana real. El
          panel recorta (overflow-hidden) para que las esquinas queden limpias. */}
      <div className="-mx-10 -mt-10 mb-5 flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-5 py-3">
        <span className="flex gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-accent/90" />
          <span className="h-3 w-3 rounded-full bg-white/25" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
        </span>
        <span className="font-mono text-xs tracking-tight text-ink-muted">
          {WINDOW_TITLE}
        </span>
      </div>

      {/* Prompt + comando. */}
      <p className="mb-4 font-mono text-xs text-ink-muted sm:text-sm" aria-hidden>
        <span className="text-accent">$</span> {COMMAND}
      </p>

      <h2 className="mb-3 font-sans text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {t('hero.title')}
      </h2>

      <p className="mb-2.5 font-sans text-sm leading-relaxed text-ink sm:text-base">
        {t('hero.bioLead')}
      </p>
      <p className="font-sans text-xs leading-relaxed text-ink-muted sm:text-sm">
        {t('hero.bio')}
      </p>

      {/* Metadatos clave/valor (estilo front-matter de terminal). */}
      <dl className="mt-4 grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-1.5 border-t border-white/10 pt-3 font-mono text-xs sm:grid-cols-[6.5rem_1fr]">
        {META_ROWS.map((row) => (
          <div key={row} className="contents">
            <dt className="text-accent">{t(`hero.meta.${row}.label`)}</dt>
            <dd className="text-ink-muted">{t(`hero.meta.${row}.value`)}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-3 font-mono text-xs text-ink-muted" aria-hidden>
        <span className="text-accent">$</span>
        <span className="caret-blink ml-2 inline-block h-3.5 w-2 bg-accent align-middle" />
      </p>
    </div>
  );
}
