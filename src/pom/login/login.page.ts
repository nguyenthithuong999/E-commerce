import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pom/base.page";

export class LoginPage extends BasePage {
  readonly locs: {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorButton: Locator;
    readonly errorMessage: Locator;
  };

  constructor(page: Page) {
    super(page);
    this.locs = {
      usernameInput: this.page.getByPlaceholder("Username"),
      passwordInput: this.page.getByPlaceholder("Password"),
      loginButton: this.page.getByRole("button", { name: "Login" }),
      errorButton: this.page.getByTestId("error-button"),
      errorMessage: this.page.getByTestId("error"),
    };
  }

  async login(user: string, pass: string): Promise<void> {
    await this.locs.usernameInput.fill(user);
    await this.locs.passwordInput.fill(pass);
    await this.locs.loginButton.click();
  }

  async closeErrorMessage(): Promise<void> {
    await this.locs.errorButton.click();
  }
}
