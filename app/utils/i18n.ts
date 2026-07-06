import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';

export interface ITranslationDictionaries {
    [key: string]: string | ITranslationDictionaries;
}

/*
 * [on build]
 * Locale files indexed by language code ("en" => lazy import of en.json).
 * Lazy-loaded on demand so vocabularies stay out of the main bundle.
 */
const localeImports = import.meta.glob<{ default: ITranslationDictionaries }>('../locales/*.json');
const localeFiles: Record<string, () => Promise<{ default: ITranslationDictionaries }>> = {};
for (const [path, load] of Object.entries(localeImports)) {
    const language = /([\w-]+)\.json$/.exec(path)?.[1];
    if (language) localeFiles[language] = load;
}

/*
 * [on build]
 * Supported languages: from ENV when set (useful for server-driven vocabularies),
 * otherwise inferred from the locales folder.
 */
export const supportedLanguages: string[] = import.meta.env.VITE_APP_SUPPORTED_LOCALES
    ? (import.meta.env.VITE_APP_SUPPORTED_LOCALES as string).split(',').map((code) => code.trim())
    : Object.keys(localeFiles);

/*
 * [on build]
 * Languages whose vocabulary has already been fetched.
 */
export const loadedLanguages: string[] = [];

/*
 * Fallback in case the requested language is not supported.
 */
const fallbackLocale = (import.meta.env.VITE_APP_FALLBACK_LOCALE as string | undefined) ?? 'en';

/*
 * [on build]
 * I18n init. Messages start empty: the plugin loads the default locale on startup.
 */
export const i18n = createI18n({
    // MUST be false to use composition API
    legacy: false,
    locale: fallbackLocale,
    fallbackLocale
});

/*
 * Fetch a locale file and register its vocabulary.
 * Missing file resolves silently: fallbackLocale messages are used instead.
 * @param locale language code, e.g. "it"
 * @returns resolves when the vocabulary is registered
 */
function loadMessages(locale: string): Promise<void> {
    const importFile = localeFiles[locale];
    if (!importFile) return Promise.resolve();
    return importFile().then((file) => {
        loadedLanguages.push(locale);
        i18n.global.setLocaleMessage(locale, file.default);
    });
}

/*
 * Apply an already-loaded locale to i18n and to the <html lang> attribute.
 * @param locale language code
 * @returns nextTick, so callers can await the re-render
 */
function setLocale(locale: string): Promise<void> {
    i18n.global.locale.value = locale;
    // Also the place to set fetch/axios Accept-Language headers if ever needed.
    document.querySelector('html')?.setAttribute('lang', locale);
    return nextTick();
}

/*
 * Change the app language, lazy-loading its vocabulary on first use.
 * Unsupported languages fall back to fallbackLocale.
 * @param locale requested language code
 * @returns resolves when the language is active
 */
export function changeLanguage(locale: string): Promise<void> {
    const target = supportedLanguages.includes(locale) ? locale : fallbackLocale;
    if (loadedLanguages.includes(target)) return setLocale(target);
    return loadMessages(target).then(() => setLocale(target));
}

/*
 * Best starting language: browser language when supported, ENV default otherwise.
 * @returns language code to boot the app with
 */
export function getDefaultLocale(): string {
    const browserLocale = navigator.language.slice(0, 2);
    if (supportedLanguages.includes(browserLocale)) return browserLocale;
    return (import.meta.env.VITE_APP_DEFAULT_LOCALE as string | undefined) ?? fallbackLocale;
}

/*
 * Current active locale value.
 * Reactive when read inside templates/computed (locale is a ref).
 */
export const getCurrentLocale = () => i18n.global.locale.value;
