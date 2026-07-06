import { changeLanguage, getDefaultLocale, i18n } from '~/utils/i18n';

/*
 * Registers vue-i18n and boots with the browser language
 * (falls back to the ENV default when unsupported).
 */
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(i18n);
    return changeLanguage(getDefaultLocale());
});
