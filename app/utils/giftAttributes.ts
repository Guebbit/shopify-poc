import type { CartLineAttribute } from '@api';

export const GIFT_WRAP_ATTRIBUTE = 'gift_wrap';
export const GIFT_MESSAGE_ATTRIBUTE = 'gift_message';

/*
 * Build cart line attributes for the gift options.
 * Returns an empty array when gift wrap is off, so plain lines carry no attributes.
 * @param isGiftWrapped whether gift wrap was requested
 * @param giftMessage optional custom message, only stored together with gift wrap
 * @returns Storefront-ready line attributes
 */
export const buildGiftAttributes = (
    isGiftWrapped: boolean,
    giftMessage: string
): CartLineAttribute[] => {
    if (!isGiftWrapped) {
        return [];
    }
    const attributes: CartLineAttribute[] = [{ key: GIFT_WRAP_ATTRIBUTE, value: 'true' }];
    const message = giftMessage.trim();
    if (message) {
        attributes.push({ key: GIFT_MESSAGE_ATTRIBUTE, value: message });
    }
    return attributes;
};

/*
 * Read the gift options back from cart line attributes.
 * @param attributes attributes returned by the cart query
 * @returns gift wrap flag and message (undefined when absent)
 */
export const parseGiftAttributes = (
    attributes: CartLineAttribute[]
): {
    isGiftWrapped: boolean;
    giftMessage: string | undefined;
} => {
    const valueOf = (key: string) => attributes.find((attribute) => attribute.key === key)?.value;
    return {
        isGiftWrapped: valueOf(GIFT_WRAP_ATTRIBUTE) === 'true',
        giftMessage: valueOf(GIFT_MESSAGE_ATTRIBUTE)
    };
};
