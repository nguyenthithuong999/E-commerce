import { test as base, expect } from "@playwright/test";
import path from "path";

const authFile = path.resolve(__dirname, "../../.auth/user.json");

base("authenticate", async ({ page }) => {
  const url = process.env.BASE_URL || "";

  // Login
  await page.goto(url);
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  // Verify login succeeded
  await expect(page.getByText("Products", { exact: true })).toBeVisible();

  // Save authentication state to file
  await page.context().storageState({ path: authFile });
});
