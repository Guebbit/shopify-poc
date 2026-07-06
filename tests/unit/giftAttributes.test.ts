import { describe, expect, it } from 'vitest';
import {
    buildGiftAttributes,
    parseGiftAttributes,
    GIFT_MESSAGE_ATTRIBUTE,
    GIFT_WRAP_ATTRIBUTE
} from '../../app/utils/giftAttributes';

describe('buildGiftAttributes', () => {
    it('returns no attributes when gift wrap is off', () => {
        expect(buildGiftAttributes(false, 'ignored')).toEqual([]);
    });

    it('builds the wrap flag and trimmed message', () => {
        expect(buildGiftAttributes(true, '  Happy birthday  ')).toEqual([
            { key: GIFT_WRAP_ATTRIBUTE, value: 'true' },
            { key: GIFT_MESSAGE_ATTRIBUTE, value: 'Happy birthday' }
        ]);
    });

    it('omits the message attribute when the message is blank', () => {
        expect(buildGiftAttributes(true, ' '.repeat(3))).toEqual([
            { key: GIFT_WRAP_ATTRIBUTE, value: 'true' }
        ]);
    });
});

describe('parseGiftAttributes', () => {
    it('reads gift options back from line attributes', () => {
        expect(parseGiftAttributes(buildGiftAttributes(true, 'Cheers!'))).toEqual({
            isGiftWrapped: true,
            giftMessage: 'Cheers!'
        });
    });

    it('defaults to no gift options', () => {
        expect(parseGiftAttributes([])).toEqual({
            isGiftWrapped: false,
            giftMessage: undefined
        });
    });
});
