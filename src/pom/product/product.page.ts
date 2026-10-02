import { Page } from "@playwright/test";
import { BasePage } from "@pom/base.page";

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get locs() {
    return {
      productTitle: this.page.getByText("Products", { exact: true }),
      addToCartButtons: this.page.getByRole("button", { name: "Add to cart" }),
      removeButtons: this.page.getByRole("button", { name: "Remove" }),
      cartBadge: this.page.locator(".shopping_cart_badge"),
      sortDropdown: this.page.locator(".product_sort_container"),
      productPrice: this.page.locator(".inventory_item_price"),
      productName: this.page.locator(".inventory_item_name"),
    };
  }

  getAddToCartButton(count: number) {
    return this.locs.addToCartButtons.nth(count);
  }

  getRemoveButton(count: number) {
    return this.locs.removeButtons.nth(count);
  }

  getsortDropdown(label: string) {
    return this.locs.sortDropdown.selectOption(label);
  }

  async addToCart(count: number) {
    await this.getAddToCartButton(count).click();
  }

  async remove(count: number) {
    await this.getRemoveButton(count).click();
  }

  async sortBy(label: string) {
    await this.getsortDropdown(label);
  }
}
