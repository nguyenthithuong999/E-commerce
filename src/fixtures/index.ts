import { mergeTests } from "@playwright/test";
import { test as loginTest } from "@fixtures/login/login.fixtures";
import { test as productTest } from "@fixtures/product/product.fixtures";
import { test as cartTest } from "@fixtures/cart/cart.fixtures";
import { test as checkoutTest } from "@fixtures/checkout/checkout.fixtures";
import { test as configTest } from "@fixtures/config.fixtures";

export const test = mergeTests(
  loginTest,
  productTest,
  cartTest,
  checkoutTest,
  configTest,
);
