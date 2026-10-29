import { expect } from "@playwright/test";
import { test } from "@fixtures/index";

test.describe("SauceDemo Login Feature", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.openPage("/");
  });

  test(
    "TC001: Login failed with invalid credentials and close error message",
    {
      tag: ["@LOGIN_001", "@regression"],
    },
    async ({ loginPage, conf }) => {
      const { user, pass, msg } = conf;

      await loginPage.login(user, pass);

      // Verify error message
      await expect(loginPage.locs.errorMessage).toHaveText(msg!);
      await expect(loginPage.locs.errorButton).toBeVisible();

      await loginPage.closeErrorMessage();
      await expect(loginPage.locs.errorMessage).not.toBeVisible();
    },
  );

  test(
    "TC002: Login failed when username is empty",
    { tag: ["@LOGIN_002", "@regression"] },
    async ({ loginPage, conf }) => {
      const { user, pass, msg } = conf;

      await loginPage.login(user, pass);
      await expect(loginPage.locs.errorMessage).toHaveText(msg!);
    },
  );

  test(
    "TC003: Login failed when password is empty",
    { tag: ["@LOGIN_003", "@regression"] },
    async ({ loginPage, conf }) => {
      const { user, pass, msg } = conf;

      await loginPage.login(user, pass);
      await expect(loginPage.locs.errorMessage).toHaveText(msg!);
    },
  );

  test(
    "TC004: Login failed when both username and password are empty",
    { tag: ["@LOGIN_004", "@regression"] },
    async ({ loginPage, conf }) => {
      const { user, pass, msg } = conf;

      await loginPage.login(user, pass);
      await expect(loginPage.locs.errorMessage).toHaveText(msg!);
    },
  );

  test(
    "TC005: Login successfully and redirect to Products page",
    {
      tag: ["@LOGIN_005", "@smoke", "@regression"],
    },
    async ({ loginPage, productPage, conf }) => {
      const { user, pass } = conf;

      await loginPage.login(user, pass);

      // Check login redirection
      await expect(loginPage.page).toHaveURL("/inventory.html");
      await expect(productPage.locs.productTitle).toBeVisible();
    },
  );
});
