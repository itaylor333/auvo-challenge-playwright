import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

test.describe('E2E Purchase Flow', () => {

    let loginPage;
    let inventoryPage;
    let productDetailsPage;
    let cartPage;
    let checkoutOne;
    let checkoutTwo;
    let checkoutComplete;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        productDetailsPage = new ProductDetailsPage(page);
        cartPage = new CartPage(page);
        checkoutOne = new CheckoutStepOnePage(page);
        checkoutTwo = new CheckoutStepTwoPage(page);
        checkoutComplete = new CheckoutCompletePage(page);

        await loginPage.navigateTo();
        await loginPage.submitLogin('standard_user', 'secret_sauce');
        await page.waitForURL('https://www.saucedemo.com/inventory.html');
    });

    test('User completes a full purchase flow', async ({ page }) => {

        const productName = 'Sauce Labs Backpack';

        await inventoryPage.sortProductsBy('Price (low to high)');

        await inventoryPage.goToProductDetails(productName);
        await expect(productDetailsPage.getTitle()).toHaveText(productName);
        await expect(productDetailsPage.getPrice()).toHaveText('$29.99');
        await productDetailsPage.addToCart();
        await productDetailsPage.goToCart();

        await expect(cartPage.getCartItemByName(productName)).toBeVisible();
        await cartPage.goToCheckout();

        await checkoutOne.fillCheckoutInfo('Standard', 'User', '999077');

        await expect(checkoutTwo.getTotalPriceLabel()).toContainText('Total: $32.39');
        await checkoutTwo.finishCheckout();

        await expect(checkoutComplete.getConfirmationHeader()).toHaveText('Thank you for your order!');
        await expect(checkoutComplete.getBackHomeButton()).toBeVisible();
    });
});