import type { Money } from '@api';

/*
 * Money formatter bound to the active i18n locale.
 * Composable (not a plain util): the locale comes from the app-scoped
 * vue-i18n instance via injection, so there is no module-level singleton
 * and the formatter stays correct per request under SSR.
 * Reactive in templates: the returned function reads the locale ref.
 * @returns formatter for contract Money values, e.g. "£12.90"
 */
export const useFormatMoney = () => {
    const { locale } = useI18n();
    return (money: Money): string =>
        new Intl.NumberFormat(locale.value, {
            style: 'currency',
            currency: money.currencyCode
        }).format(Number(money.amount));
};
