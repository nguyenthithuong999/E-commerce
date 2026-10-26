import { Page } from "@playwright/test";
import { BasePage } from "@pom/base.page";

export class LoginPage extends BasePage {
  readonly locs;

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

  async login(user: string, pass: string) {
    await this.locs.usernameInput.fill(user);
    await this.locs.passwordInput.fill(pass);
    await this.locs.loginButton.click();
  }
}
