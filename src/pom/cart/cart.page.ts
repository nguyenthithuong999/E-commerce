import { Page } from "@playwright/test";

import { BasePage } from "@pom/base.page";

export class CartPage extends BasePage {
  readonly locs;
  constructor(page: Page) {
    super(page);
    this.locs = {
      cartTitle: this.page.getByText("Your Cart", { exact: true }),
      cartItem: this.page.locator(".cart_item"),
      checkoutButton: this.page.getByRole("button", { name: "Checkout" }),
    };
  }
}
