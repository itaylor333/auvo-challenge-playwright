export class CheckoutStepTwoPage {

    constructor(page) {
        this.page = page;
        this.paymentInfoLabel = page.locator('[data-test="payment-info-label"]');
        this.shippingInfoLabel = page.locator('[data-test="shipping-info-label"]');
        this.totalPriceLabel = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }

    async finishCheckout() {
        await this.finishButton.click();
        await this.page.waitForURL('https://www.saucedemo.com/checkout-complete.html');
    }

    getPaymentInfoLabel() {
        return this.paymentInfoLabel;
    }

    getShippingInfoLabel() {
        return this.shippingInfoLabel;
    }

    getTotalPriceLabel() {
        return this.totalPriceLabel;
    }
}