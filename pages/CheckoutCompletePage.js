export class CheckoutCompletePage {

    constructor(page) {
        this.page = page;
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.ponyExpressImage = page.locator('[data-test="pony-express"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    getConfirmationHeader() {
        return this.completeHeader;
    }

    getBackHomeButton() {
        return this.backHomeButton;
    }
}