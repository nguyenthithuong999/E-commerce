import { Locator, Page } from "@playwright/test";

export class HeaderComponent {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = this.page.locator(".shopping_cart_link");
    this.cartBadge = this.page.locator(".shopping_cart_badge");
  }

  // Clicks cart icon to navigate to the cart page.
  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
