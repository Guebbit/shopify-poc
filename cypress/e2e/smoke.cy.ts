import { interceptShopify, PRODUCT_TITLE } from '../support/shopify';

describe('smoke', () => {
    beforeEach(() => {
        interceptShopify();
    });

    it('shows the app shell: logo, language switcher and cart link', () => {
        cy.visit('/');
        // Generous timeout: the first visit pays Vite's on-demand transform cost.
        cy.get('header img[alt="Callmewine"]', { timeout: 30_000 }).should('be.visible');
        cy.get('header select').should('have.value', 'en');
        cy.contains('header a', 'Cart').should('have.attr', 'href', '/cart');
    });

    it('loads the PDP with product, prices and gift option', () => {
        cy.visit('/');
        cy.wait('@ProductDetail', { timeout: 30_000 });
        cy.contains('h1', PRODUCT_TITLE);
        cy.contains('€42.50');
        cy.contains('s', '€49.90');
        cy.contains('label', 'Gift wrap this product');
        cy.contains('button', 'Add to cart').should('be.enabled');
    });

    it('loads the cart page with the empty state', () => {
        cy.visit('/cart');
        cy.contains('h1', 'Your cart');
        cy.contains('Your cart is empty');
        cy.contains('a', 'back to the product').should('have.attr', 'href', '/');
    });
});
