import { useTranslation } from 'react-i18next';
import { LANGUAGES, type Language } from '../i18n';

/**
 * Conmutador de idioma ES/EN. El cambio se persiste en localStorage y
 * actualiza `<html lang>` desde la config de i18n (ver src/i18n/index.ts).
 */
export default function LanguageToggle() {
  const { t, i18n } = useTranslation();
  const active = i18n.language as Language;

  return (
    <div
      role="group"
      aria-label={t('common.language')}
      className="flex items-center gap-1 text-sm font-medium"
    >
      {LANGUAGES.map((lng) => {
        const isActive = active === lng;
        return (
          <button
            key={lng}
            type="button"
            onClick={() => void i18n.changeLanguage(lng)}
            aria-pressed={isActive}
            className={`rounded px-2 py-1 uppercase tracking-wide transition-colors ${
              isActive
                ? 'text-accent'
                : 'text-ink-muted hover:text-ink focus-visible:text-ink'
            }`}
          >
            {lng}
          </button>
        );
      })}
    </div>
  );
}
