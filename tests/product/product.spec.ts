import { expect } from "@playwright/test";
import { test } from "@fixtures/index";

test.describe("SauceDemo Product Feature", () => {
  test.beforeEach("Check product title", async ({ productPage }) => {
    await productPage.openPage("/inventory.html");
    await expect(productPage.locs.productTitle).toBeVisible();
  });

  test("TC001", { tag: ["@PRODUCT_001"] }, async ({ productPage }) => {
    await expect(productPage.getAddToCartButton(0)).toBeVisible();

    await productPage.addToCart(0);

    await expect(productPage.getRemoveButton(0)).toBeVisible();

    await expect(productPage.locs.cartBadge).toHaveCount(1);
  });

  test("TC002", { tag: ["@PRODUCT_002"] }, async ({ productPage }) => {
    await productPage.addToCart(0);

    await productPage.remove(0);

    await expect(productPage.getAddToCartButton(0)).toBeVisible();

    await expect(productPage.locs.cartBadge).toHaveCount(0);
  });

  test("TC003", { tag: ["@PRODUCT_003"] }, async ({ productPage }) => {
    await productPage.sortBy("lohi");
    const priceTexts = await productPage.locs.productPrice.allTextContents();

    // lấy toàn bộ tiền thực hiện xóa "$" và format về number
    const prices = priceTexts.map((item) => parseFloat(item.replace("$", "")));

    // sắp xếp tăng dần để làm chuẩn so sánh
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test("TC004", { tag: ["@PRODUCT_004"] }, async ({ productPage }) => {
    await productPage.sortBy("za");
    const names = await productPage.locs.productName.allTextContents();

    // sắp xếp giảm dần để làm chuẩn so sánh
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));

    expect(names).toEqual(sortedNames);
  });
});
