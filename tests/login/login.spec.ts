import { expect } from "@playwright/test";
import { test } from "@fixtures/index";

test.describe("SauceDemo Login Feature", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.openPage("/");
  });
  test(
    "TC001: Login fail",
    {
      tag: ["@LOGIN_001"],
    },
    async ({ loginPage, conf }) => {
      const { user, pass, msg } = conf;

      await loginPage.login(user, pass);

      // check login
      await expect(loginPage.locs.errorMessage).toHaveText(msg);
      await expect(loginPage.locs.errorButton).toBeVisible();

      await loginPage.locs.errorButton.click();
      await expect(loginPage.locs.errorMessage).not.toBeVisible();
    },
  );

  test(
    "TC002: Login fail - empty username",
    { tag: ["@LOGIN_002"] },
    async ({ loginPage, conf }) => {
      const { user, pass, msg } = conf;

      await loginPage.login(user, pass);
      await expect(loginPage.locs.errorMessage).toHaveText(msg);
    },
  );
  test(
    "TC003: Login fail - empty password",
    { tag: ["@LOGIN_003"] },
    async ({ loginPage, conf }) => {
      const { user, pass, msg } = conf;

      await loginPage.login(user, pass);
      await expect(loginPage.locs.errorMessage).toHaveText(msg);
    },
  );
  test(
    "TC004: Login fail - empty username and password",
    { tag: ["@LOGIN_004"] },
    async ({ loginPage, conf }) => {
      const { user, pass, msg } = conf;

      await loginPage.login(user, pass);
      await expect(loginPage.locs.errorMessage).toHaveText(msg);
    },
  );

  test(
    "TC005: Login success",
    {
      tag: ["@LOGIN_005"],
    },
    async ({ loginPage, productPage, conf }) => {
      const { user, pass } = conf;

      await loginPage.login(user, pass);

      // check login
      await expect(loginPage.page).toHaveURL("/inventory.html");
      await expect(productPage.locs.productTitle).toBeVisible();
    },
  );
});
