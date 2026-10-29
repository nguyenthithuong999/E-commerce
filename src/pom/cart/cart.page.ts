import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pom/base.page";

export class CartPage extends BasePage {
  readonly locs: {
    readonly cartTitle: Locator;
    readonly cartItem: Locator;
    readonly itemName: Locator;
    readonly itemPrice: Locator;
    readonly removeButton: (index: number) => Locator;
    readonly checkoutButton: Locator;
    readonly backButton: Locator;
  };

  constructor(page: Page) {
    super(page);
    this.locs = {
      cartTitle: this.page.getByText("Your Cart", { exact: true }),
      cartItem: this.page.locator(".cart_item"),
      itemName: this.page.locator('[data-test="inventory-item-name"]'),
      itemPrice: this.page.locator('[data-test="inventory-item-price"]'),
      removeButton: (index: number) =>
        this.page.getByRole("button", { name: "Remove" }).nth(index),
      checkoutButton: this.page.getByRole("button", { name: "Checkout" }),
      backButton: this.page.getByRole("button", { name: "Continue Shopping" }),
    };
  }

  async removeItem(index: number): Promise<void> {
    await this.locs.removeButton(index).click();
  }

  async clickCheckout(): Promise<void> {
    await this.locs.checkoutButton.click();
  }

  async clickContinueShopping(): Promise<void> {
    await this.locs.backButton.click();
  }

  async getCartItemCount(): Promise<number> {
    return await this.locs.cartItem.count();
  }

  async getItemNames(): Promise<string[]> {
    return await this.locs.itemName.allTextContents();
  }

  async getItemPrices(): Promise<string[]> {
    return await this.locs.itemPrice.allTextContents();
  }
}
