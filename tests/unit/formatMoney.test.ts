import { describe, expect, it } from 'vitest';
import { formatMoney } from '../../app/utils/formatMoney';

describe('formatMoney', () => {
    it('formats a Money value as a localized currency string', () => {
        expect(formatMoney({ amount: '12.9', currencyCode: 'EUR' })).toBe('€12.90');
    });

    it('respects the currency code', () => {
        expect(formatMoney({ amount: '5', currencyCode: 'USD' })).toBe('$5.00');
    });
});
