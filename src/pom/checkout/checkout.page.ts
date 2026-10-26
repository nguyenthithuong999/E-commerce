import { Page } from "@playwright/test";

import { BasePage } from "@pom/base.page";

export class CheckoutPage extends BasePage {
  readonly locs;

  constructor(page: Page) {
    super(page);
    this.locs = {
      checkoutTitle: this.page.getByText("Checkout: Your Information", {
        exact: true,
      }),
      firstName: this.page.getByPlaceholder("First Name"),
      lastName: this.page.getByPlaceholder("Last Name"),
      postalCode: this.page.getByPlaceholder("Zip/Postal Code"),
      errorField: this.page.locator(".error-message-container"),
      completeHeader: this.page.getByRole("heading", {
        name: "Thank you for your order!",
      }),
      itemName: this.page.locator('[data-test="inventory-item-name"]'),
      itemPrice: this.page.locator('[data-test="inventory-item-price"]'),
      totalItem: this.page.locator('[data-test="subtotal-label"]'),
      continueButton: this.page.getByRole("button", { name: "Continue" }),
      cancelButton: this.page.getByRole("button", { name: "Cancel" }),
      finishButton: this.page.getByRole("button", { name: "Finish" }),
      backButton: this.page.getByRole("button", { name: "Back Home" }),
    };
  }
}
