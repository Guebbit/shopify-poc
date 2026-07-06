import type { Money } from '@api';
import { getCurrentLocale } from '~/utils/i18n';

/*
 * Format a contract Money value with the active i18n locale.
 * Reactive in templates: reads the i18n locale ref.
 * @param money amount + currency as returned by Shopify
 * @returns localized price string, e.g. "£12.90"
 */
export function formatMoney(money: Money): string {
    return new Intl.NumberFormat(getCurrentLocale(), {
        style: 'currency',
        currency: money.currencyCode
    }).format(Number(money.amount));
}
