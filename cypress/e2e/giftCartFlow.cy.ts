import { GIFT_MESSAGE, interceptShopify, PRODUCT_TITLE, VARIANT_ID } from '../support/shopify';

/*
 * Core business flow: add the product to the cart with gift wrap + message
 * (sent as cart line attributes) and see them again on the cart page.
 */
describe('gift purchase flow', () => {
    beforeEach(() => {
        interceptShopify();
    });

    it('adds the product with gift wrap and shows it in the cart', () => {
        cy.visit('/');
        // Generous timeout: the first visit pays Vite's on-demand transform cost.
        cy.wait('@ProductDetail', { timeout: 30_000 });

        // Gift message field appears only once gift wrap is checked.
        cy.get('textarea').should('not.exist');
        cy.contains('label', 'Gift wrap this product').find('input[type="checkbox"]').check();
        cy.get('textarea').type(GIFT_MESSAGE);

        cy.contains('button', 'Add to cart').click();

        // Lazy cartCreate first, then the line with the gift attributes.
        cy.wait('@CartCreate');
        cy.wait('@CartLinesAdd')
            .its('request.body.variables.lines')
            .should('deep.equal', [
                {
                    merchandiseId: VARIANT_ID,
                    quantity: 1,
                    attributes: [
                        { key: 'gift_wrap', value: 'true' },
                        { key: 'gift_message', value: GIFT_MESSAGE }
                    ]
                }
            ]);

        cy.contains('Added to cart');
        // Header badge reflects the updated cart quantity.
        cy.contains('header a', 'Cart').contains('1');

        cy.contains('a', 'view cart').click();
        cy.location('pathname').should('eq', '/cart');
        cy.wait('@Cart');

        cy.contains(PRODUCT_TITLE);
        cy.contains('Qty 1');
        cy.contains('Gift wrapped');
        cy.contains(GIFT_MESSAGE);
        cy.contains('Subtotal: €42.50');
    });
});
