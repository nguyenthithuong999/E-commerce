import { expect } from "@playwright/test";
import { test } from "@fixtures/index";

test.describe("SauceDemo Product Feature", () => {
  test.beforeEach("Check product title", async ({ productPage }) => {
    await productPage.openPage("/inventory.html");
    await expect(productPage.locs.productTitle).toBeVisible();
  });

  test("TC001", { tag: ["@PRODUCT_001"] }, async ({ productPage }) => {
    await expect(productPage.locs.addToCartButtons(0)).toBeVisible();

    await productPage.addToCart(0);

    await expect(productPage.locs.removeButtons(0)).toBeVisible();

    await expect(productPage.locs.cartBadge).toHaveCount(1);
  });

  test("TC002", { tag: ["@PRODUCT_002"] }, async ({ productPage }) => {
    await productPage.addToCart(0);
    await expect(productPage.locs.cartBadge).toHaveCount(1);
    await productPage.remove(0);

    await expect(productPage.locs.addToCartButtons(0)).toBeVisible();

    await expect(productPage.locs.cartBadge).toHaveCount(0);
  });

  test("TC003", { tag: ["@PRODUCT_003"] }, async ({ productPage }) => {
    await productPage.sortBy("az");
    const names = await productPage.locs.itemName.allTextContents();

    // sắp xếp tăng dần để làm chuẩn so sánh
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

    expect(names).toEqual(sortedNames);
  });

  test("TC004", { tag: ["@PRODUCT_004"] }, async ({ productPage }) => {
    await productPage.sortBy("za");
    const names = await productPage.locs.itemName.allTextContents();

    // sắp xếp giảm dần để làm chuẩn so sánh
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));

    expect(names).toEqual(sortedNames);
  });

  test("TC005", { tag: ["@PRODUCT_005"] }, async ({ productPage }) => {
    await productPage.sortBy("lohi");
    const priceTexts = await productPage.locs.itemPrice.allTextContents();

    // lấy toàn bộ tiền thực hiện xóa "$" và format về number
    const prices = priceTexts.map((item) => parseFloat(item.replace("$", "")));

    // sắp xếp tăng dần để làm chuẩn so sánh
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test("TC006", { tag: ["@PRODUCT_006"] }, async ({ productPage }) => {
    await productPage.sortBy("hilo");
    const priceTexts = await productPage.locs.itemPrice.allTextContents();

    // lấy toàn bộ tiền thực hiện xóa "$" và format về number
    const prices = priceTexts.map((item) => parseFloat(item.replace("$", "")));

    // sắp xếp giảm dần để làm chuẩn so sánh
    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
  });

  test("TC007", { tag: ["@PRODUCT_007"] }, async ({ productPage }) => {
    await productPage.addToCart(0);
    await productPage.addToCart(1);
    await productPage.addToCart(2);

    await expect(productPage.locs.removeButtons(0)).toBeVisible();
    await expect(productPage.locs.removeButtons(1)).toBeVisible();
    await expect(productPage.locs.removeButtons(2)).toBeVisible();

    await expect(productPage.locs.cartBadge).toHaveText("3");
  });

  test("TC008", { tag: ["@PRODUCT_008"] }, async ({ productPage, conf }) => {
    const { label, description, price } = conf;
    await expect(productPage.locs.itemLabel(label)).toBeVisible();
    await productPage.locs.itemLabel(label).click();

    await expect(productPage.page).toHaveURL(/id=/);
    await expect(productPage.locs.itemName).toHaveText(label);
    await expect(productPage.locs.itemDesc).toHaveText(description);
    const priceTexts = await productPage.locs.itemPrice.allTextContents();
    expect(Number(priceTexts[0].replace("$", ""))).toEqual(price);
    await expect(productPage.locs.addToCartButton).toBeVisible();
  });

  test("TC009", { tag: ["@PRODUCT_009"] }, async ({ productPage, conf }) => {
    const expectedProducts = conf;

    // 1. Verify số lượng sản phẩm hiển thị trên trang
    await expect(productPage.locs.itemName).toHaveCount(
      expectedProducts.length,
    );

    // 2. Lấy danh sách tên và giá thực tế trên UI
    const actualNames = await productPage.locs.itemName.allTextContents();
    const actualPrices = await productPage.locs.itemPrice.allTextContents();

    // 3. Verify danh sách tên sản phẩm
    const expectedNames = expectedProducts.map((p: any) => p.name);
    expect(actualNames).toEqual(expectedNames);

    // 4. Verify giá tiền từng sản phẩm
    const expectedPrices = expectedProducts.map((p: any) => `$${p.price}`);
    expect(actualPrices).toEqual(expectedPrices);
  });
});
