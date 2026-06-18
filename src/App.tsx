import { useTranslation } from 'react-i18next';
import About from './components/About';
import LanguageToggle from './components/LanguageToggle';
import Scene from './components/Scene';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useMediaQuery } from './hooks/useMediaQuery';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Caras del anillo: Sobre mí, Proyectos, Stack, Contacto. Solo "Sobre mí" tiene
// contenido real (Bloque 3); las otras tres quedan como placeholder hasta sus
// bloques (4 y 5).
const PLACEHOLDER_COUNT = 3;

export default function App() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const wide = useMediaQuery('(min-width: 768px)');
  // El efecto 3D pesado solo en pantallas anchas y si no se pide menos motion.
  const effectEnabled = wide && !reduced;

  useSmoothScroll(effectEnabled);

  const items = [
    <About key="about" />,
    ...Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
      <span key={i} className="font-sans text-2xl font-medium text-ink-muted">
        {t('scene.soon')}
      </span>
    )),
  ];

  return (
    <main className="relative bg-night">
      <div className="fixed right-6 top-6 z-10">
        <LanguageToggle />
      </div>

      <Scene items={items} enabled={effectEnabled} />
    </main>
  );
}
