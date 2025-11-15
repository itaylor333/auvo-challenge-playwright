export class CartPage {

    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.cartItem = page.locator('[data-test="inventory-item"]');
    }

    async goToCheckout() {
        await this.checkoutButton.click();
        await this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
        await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
    }

    /**
        @param {string} productName
    */

    getCartItemByName(productName) {
        return this.cartItem.filter({ hasText: productName });
    }

    /**
        @param {string} productName 
    */

    async removeProductByName(productName) {
        const itemLocator = this.getCartItemByName(productName);
        await itemLocator.locator('button:text("Remove")').click();
    }

}