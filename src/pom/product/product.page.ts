import { Page } from "@playwright/test";
import { BasePage } from "@pom/base.page";

export class ProductPage extends BasePage {
  readonly locs;

  constructor(page: Page) {
    super(page);
    this.locs = {
      productTitle: this.page.getByText("Products", { exact: true }),
      addToCartButton: this.page.getByRole("button", { name: "Add to cart" }),
      itemName: this.page.getByTestId("inventory-item-name"),
      itemDesc: this.page.getByTestId("inventory-item-desc"),
      itemPrice: this.page.getByTestId("inventory-item-price"),
      productList: this.page.getByTestId("inventory-item"),
      addToCartButtons: (count: number) =>
        this.page.getByRole("button", { name: "Add to cart" }).nth(count),
      removeButtons: (count: number) =>
        this.page.getByRole("button", { name: "Remove" }).nth(count),
      cartBadge: this.page.locator(".shopping_cart_badge"),
      sortDropdown: this.page.locator(".product_sort_container"),
      itemLabel: (label: number) =>
        this.page.locator(`[aria-label="View details for ${label}"]`).first(),
    };
  }

  async addToCart(count: number) {
    await this.locs.addToCartButtons(count).click();
  }

  async remove(count: number) {
    await this.locs.removeButtons(count).click();
  }

  async sortBy(label: string) {
    await this.locs.sortDropdown.selectOption(label);
  }
}
