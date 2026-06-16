import { useTranslation } from 'react-i18next';
import LanguageToggle from './components/LanguageToggle';

export default function App() {
  const { t } = useTranslation();

  return (
    <main className="relative flex h-full w-full flex-col items-center justify-center bg-base">
      <div className="absolute right-6 top-6">
        <LanguageToggle />
      </div>

      <h1 className="font-sans text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
        {t('common.name')}
      </h1>
      <p className="mt-4 font-sans text-sm text-ink-muted sm:text-base">
        {t('common.subtitle')}
      </p>
    </main>
  );
}
