import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe('Login features', () => {

    let loginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateTo();
    });

    test('User try login with SUCCESS', async ({ page }) => {
        await loginPage.submitLogin('standard_user', 'secret_sauce');

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        const productTitle = await page.locator('.header_secondary_container > span');
        await expect(productTitle).toHaveText('Products');
    });

    test('User try login with EMPTY FIELDS', async ({ page }) => {
        await loginPage.submitLogin('', '');

        await expect(await loginPage.getErrorMessage()).toBeVisible();
        await expect(await loginPage.getErrorMessage()).toHaveText('Epic sadface: Username is required');
    });

    test('User try login with EMPTY PASSWORD FIELD', async ({ page }) => {
        await loginPage.submitLogin('standard_user', '');

        await expect(await loginPage.getErrorMessage()).toBeVisible();
        await expect(await loginPage.getErrorMessage()).toHaveText('Epic sadface: Password is required');
    });

    test('User try login with WRONG USERNAME AND PASSWORD', async ({ page }) => {
        await loginPage.submitLogin('wrong_user', 'wrong_passwd');

        await expect(await loginPage.getErrorMessage()).toBeVisible();
        await expect(await loginPage.getErrorMessage()).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
})