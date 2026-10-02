import { expect } from "@playwright/test";
import { test } from "@fixtures/index";

const url = process.env.BASE_URL || "";

test.describe("SauceDemo Login Feature", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.openPage(url);
  });
  test(
    "TC001: Login fail",
    {
      tag: ["@LOGIN_001"],
    },
    async ({ loginPage, conf }) => {
      const { user, pass } = conf;

      await loginPage.login(user, pass);

      // check login
      await expect(loginPage.locs.errorMessage).toBeVisible();
    },
  );

  test(
    "TC002: Login success",
    {
      tag: ["@LOGIN_002"],
    },
    async ({ loginPage, conf }) => {
      const { user, pass } = conf;

      await loginPage.login(user, pass);

      // check login
      await expect(loginPage.locs.productTitle).toBeVisible();
    },
  );
});
