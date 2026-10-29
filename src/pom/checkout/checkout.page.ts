import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pom/base.page";

export class CheckoutPage extends BasePage {
  readonly locs: {
    readonly checkoutTitle: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly errorField: Locator;
    readonly completeHeader: Locator;
    readonly itemName: Locator;
    readonly itemPrice: Locator;
    readonly totalItem: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;
    readonly backButton: Locator;
  };

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

  /**
   * Fills customer checkout information on Step One and proceeds.
   */
  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.locs.firstName.fill(firstName);
    await this.locs.lastName.fill(lastName);
    await this.locs.postalCode.fill(postalCode);
    await this.locs.continueButton.click();
  }

  async clickContinue(): Promise<void> {
    await this.locs.continueButton.click();
  }

  async clickCancel(): Promise<void> {
    await this.locs.cancelButton.click();
  }

  async clickFinish(): Promise<void> {
    await this.locs.finishButton.click();
  }

  async clickBackHome(): Promise<void> {
    await this.locs.backButton.click();
  }

  async getItemNames(): Promise<string[]> {
    return await this.locs.itemName.allTextContents();
  }

  async getItemPrices(): Promise<string[]> {
    return await this.locs.itemPrice.allTextContents();
  }
}
