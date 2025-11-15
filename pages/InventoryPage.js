export class InventoryPage {

    constructor(page) {
        this.page = page;
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.inventoryItem = page.locator('[data-test="inventory-item"]');
        this.activeSortOption = page.locator('[data-test="active-option"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    /**
        @param {string} value
    */
   
    async sortProductsByValue(value) {
        await this.sortDropdown.selectOption(value);
    }

    getSortContainer() {
        return this.sortDropdown;
    }

    getActiveSortOption() {
        return this.activeSortOption;
    }

    getCartBadge() {
        return this.cartBadge;
    }

    /**
        @param {string} optionText
    */

    async sortProductsBy(optionText) {
        await this.sortDropdown.selectOption(optionText);
    }

    /**
        @param {string} productName
    */

    async goToProductDetails(productName) {
        const productLocator = this.inventoryItem.filter({ hasText: productName });
        await productLocator.locator('[data-test="inventory-item-name"]').click();
        await this.page.waitForURL('https://www.saucedemo.com/inventory-item.html*');
    }

    /**
        @param {string} productName
    */

    async addProductToCartByName(productName) {
        const productLocator = this.inventoryItem.filter({ hasText: productName });
        await productLocator.locator('button:text("Add to cart")').click();
    }

    async goToCart() {
        await this.cartLink.click();
        await this.page.waitForURL('https://www.saucedemo.com/cart.html');
    }
}