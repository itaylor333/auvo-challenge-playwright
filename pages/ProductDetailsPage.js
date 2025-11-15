import { expect } from '@playwright/test';

export class ProductDetailsPage {

    constructor(page) {
        this.page = page;
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.productDescription = page.locator('[data-test="inventory-item-desc"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.addToCartButton = page.locator('button:text("Add to cart")');
        this.removeButton = page.locator('button:text("Remove")');
        this.backToProductsButton = page.locator('[data-test="back-to-products"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    getTitle() {
        return this.productName;
    }

    getDescription() {
        return this.productDescription;
    }

    getPrice() {
        return this.productPrice;
    }

    async addToCart() {
        await this.addToCartButton.click();
        await expect(this.removeButton).toBeVisible();
        await expect(this.cartBadge).toHaveText('1');
    }

    async goToCart() {
        await this.cartLink.click();
        await this.page.waitForURL('https://www.saucedemo.com/cart.html');
    }

    async backToProducts() {
        await this.backToProductsButton.click();
        await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
    }
}