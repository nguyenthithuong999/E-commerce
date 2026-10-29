import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pom/base.page";

export class ProductPage extends BasePage {
  readonly locs: {
    readonly productTitle: Locator;
    readonly addToCartButton: Locator;
    readonly itemName: Locator;
    readonly itemDesc: Locator;
    readonly itemPrice: Locator;
    readonly productList: Locator;
    readonly addToCartButtons: (index: number) => Locator;
    readonly removeButtons: (index: number) => Locator;
    readonly cartBadge: Locator;
    readonly cartShopping: Locator;
    readonly sortDropdown: Locator;
    readonly itemLabel: (label: string) => Locator;
  };

  constructor(page: Page) {
    super(page);
    this.locs = {
      productTitle: this.page.getByText("Products", { exact: true }),
      addToCartButton: this.page.getByRole("button", { name: "Add to cart" }),
      itemName: this.page.getByTestId("inventory-item-name"),
      itemDesc: this.page.getByTestId("inventory-item-desc"),
      itemPrice: this.page.getByTestId("inventory-item-price"),
      productList: this.page.getByTestId("inventory-item"),
      addToCartButtons: (index: number) =>
        this.page.getByRole("button", { name: "Add to cart" }).nth(index),
      removeButtons: (index: number) =>
        this.page.getByRole("button", { name: "Remove" }).nth(index),
      cartBadge: this.header.cartBadge,
      cartShopping: this.header.cartLink,
      sortDropdown: this.page.locator(".product_sort_container"),
      itemLabel: (label: string) =>
        this.page.locator(`[aria-label="View details for ${label}"]`).first(),
    };
  }

  async addToCart(index: number): Promise<void> {
    await this.locs.addToCartButtons(index).click();
  }

  async remove(index: number): Promise<void> {
    await this.locs.removeButtons(index).click();
  }

  async sortBy(label: string): Promise<void> {
    await this.locs.sortDropdown.selectOption(label);
  }

  async getItemNames(): Promise<string[]> {
    return await this.locs.itemName.allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.locs.itemPrice.allTextContents();
    return priceTexts.map((item) => parseFloat(item.replace("$", "")));
  }
}
