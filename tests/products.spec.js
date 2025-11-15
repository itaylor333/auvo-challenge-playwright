import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { CartPage } from "../pages/CartPage";


test.describe('Product features', () => {

    let loginPage;
    let inventoryPage;
    let productDetailsPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        productDetailsPage = new ProductDetailsPage(page);
        cartPage = new CartPage(page);

        await loginPage.navigateTo();
        await loginPage.submitLogin('standard_user', 'secret_sauce');

        await page.waitForURL('https://www.saucedemo.com/inventory.html');
    });

    test('Product validation', async ({ page }) => {
        const productName = 'Test.allTheThings() T-Shirt (Red)';

        await inventoryPage.goToProductDetails(productName);

        await expect(productDetailsPage.getTitle()).toHaveText(productName);
        await expect(productDetailsPage.getDescription()).toHaveText('This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.');
        await expect(productDetailsPage.getPrice()).toHaveText('$15.99');
    });

    test('Select product filter', async ({ page }) => {
        await expect(inventoryPage.getSortContainer()).toHaveValue('az');
        await expect(inventoryPage.getActiveSortOption()).toHaveText('Name (A to Z)');

        await inventoryPage.sortProductsByValue('hilo');

        await expect(inventoryPage.getSortContainer()).toHaveValue('hilo');
        await expect(inventoryPage.getActiveSortOption()).toHaveText('Price (high to low)');
    });

    test('Add item to cart from inventory', async ({ page }) => {
        await inventoryPage.addProductToCartByName('Test.allTheThings() T-Shirt (Red)');

        await expect(inventoryPage.getCartBadge()).toHaveText('1');
    });

    test('Remove item from cart', async ({ page }) => {
        const productName = 'Test.allTheThings() T-Shirt (Red)';

        await inventoryPage.addProductToCartByName(productName);
        await expect(inventoryPage.getCartBadge()).toHaveText('1');

        await inventoryPage.goToCart();

        await expect(cartPage.getCartItemByName(productName)).toBeVisible();

        await cartPage.removeProductByName(productName);

        await expect(cartPage.getCartItemByName(productName)).not.toBeVisible();
    });

});