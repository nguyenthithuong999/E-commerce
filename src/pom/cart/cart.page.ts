import { Page } from "@playwright/test";

import { BasePage } from "@pom/base.page";

export class CartPage extends BasePage {
  readonly locs;

  constructor(page: Page) {
    super(page);
    this.locs = {
      cartTitle: this.page.getByText("Your Cart", { exact: true }),
      cartItem: this.page.locator(".cart_item"),
      itemName: this.page.locator('[data-test="inventory-item-name"]'),
      itemPrice: this.page.locator('[data-test="inventory-item-price"]'),
      removeButton: (count: number) =>
        this.page.getByRole("button", { name: "Remove" }).nth(count),
      checkoutButton: this.page.getByRole("button", { name: "Checkout" }),
      backButton: this.page.getByRole("button", { name: "Continue Shopping" }),
    };
  }
}
