import { Page } from "@playwright/test";
import { BasePage } from "@pom/base.page";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get locs() {
    return {
      usernameInput: this.page.getByPlaceholder("Username"),
      passwordInput: this.page.getByPlaceholder("Password"),
      loginButton: this.page.getByRole("button", { name: "Login" }),
      productTitle: this.page.getByText("Products", { exact: true }),
      errorMessage: this.page.locator('[data-test="error"]'),
    };
  }

  async login(user: string, pass: string) {
    await this.locs.usernameInput.fill(user);
    await this.locs.passwordInput.fill(pass);
    await this.locs.loginButton.click();
  }
}
