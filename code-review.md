# Code Review: Login & Product Screen

> **Dự án:** SauceDemo E-Commerce Playwright Automation  
> **Ngày review:** 2026-10-19  
> **Phạm vi:** Màn hình Login & Product (POM, Fixtures, Test Specs, Test Data)

---

## 📐 Kiến trúc tổng quan

```
tests/
  login/login.spec.ts        ← Test cases
  login/login.json           ← Test data (per env)
  product/product.spec.ts
  product/product.json

src/
  pom/base.page.ts           ← Base class
  pom/login/login.page.ts    ← Login Page Object
  pom/product/product.page.ts← Product Page Object
  fixtures/login/login.fixtures.ts
  fixtures/product/product.fixtures.ts
  fixtures/config.fixtures.ts← Data-driven config loader
  fixtures/index.ts          ← mergeTests entry
  utils/config.ts            ← JSON config loader
  auth/auth.setup.ts         ← Global auth setup
```

> [!NOTE]
> Kiến trúc theo đúng chuẩn POM (Page Object Model) + Fixture pattern của Playwright — tốt về cấu trúc tổng thể.

---

## ✅ Điểm tốt

| # | Điểm mạnh |
|---|-----------|
| 1 | **POM đúng chuẩn**: Tách biệt rõ locators, actions, test logic |
| 2 | **Fixture pattern**: Sử dụng `base.extend` để inject page objects vào test — đúng best practice Playwright |
| 3 | **Data-driven**: Tách test data sang `.json` với cấu trúc `caseId → env → data` — dễ mở rộng multi-env |
| 4 | **Auth setup**: Dùng `storageState` để reuse login session cho product tests — tiết kiệm thời gian chạy |
| 5 | **`mergeTests`**: Kết hợp các fixtures gọn gàng qua `index.ts` |
| 6 | **Locator strategies tốt**: Ưu tiên `getByPlaceholder`, `getByRole`, `getByText` (semantic locators) thay vì CSS thuần |

---

## 🔴 Vấn đề nghiêm trọng (Critical)

### 1. `auth.setup.ts` — Hardcode credentials
```typescript
// ❌ src/auth/auth.setup.ts - Line 11-12
await page.getByPlaceholder("Username").fill("standard_user");
await page.getByPlaceholder("Password").fill("secret_sauce");
```
**Vấn đề:** Credentials bị hardcode trực tiếp trong source code.  
**Fix:** Đọc từ `.env` hoặc `global.json`:
```typescript
// ✅ Nên dùng
const user = process.env.AUTH_USER || "";
const pass = process.env.AUTH_PASS || "";
await page.getByPlaceholder("Username").fill(user);
await page.getByPlaceholder("Password").fill(pass);
```

---

### 2. `login.spec.ts` — `BASE_URL` load sai thời điểm
```typescript
// ❌ tests/login/login.spec.ts - Line 4
const url = process.env.BASE_URL || "";
```
**Vấn đề:** `process.env.BASE_URL` được đọc tại thời điểm **module load**, trước khi `dotenv` trong `playwright.config.ts` chạy (nếu test được import theo thứ tự sai). Playwright đã cấu hình `baseURL` sẵn trong config.  
**Fix:** Xóa `const url` và dùng `baseURL` từ config:
```typescript
// ✅ Nên dùng - openPage với relative path hoặc empty string
await loginPage.openPage("/"); // Playwright tự dùng baseURL
```

---

### 3. `product.spec.ts` — `beforeEach` dùng relative URL mà không có `baseURL` check
```typescript
// ❌ tests/product/product.spec.ts - Line 6
await productPage.openPage("/inventory.html");
```
**Vấn đề:** Nếu `baseURL` không được set trong config, test sẽ navigate đến `/inventory.html` (path không đầy đủ) và fail.  
**Đánh giá:** Hiện tại `baseURL` đã được set trong config nên hoạt động đúng, nhưng test **phụ thuộc ẩn** vào config. Nên document rõ hơn.

---

## 🟠 Vấn đề quan trọng (Major)

### 4. `config.fixtures.ts` — Type `any` quá rộng
```typescript
// ❌ src/fixtures/config.fixtures.ts - Line 4
export const test = base.extend<{ conf: any }>({
  conf: async ({}, use: any, testInfo: any) => {
```
**Vấn đề:** Dùng `any` mất đi toàn bộ type safety. Nếu test data JSON thay đổi key, TypeScript không cảnh báo.  
**Fix:** Định nghĩa generic type hoặc dùng `unknown`:
```typescript
export const test = base.extend<{ conf: Record<string, unknown> }>({
  conf: async ({}, use, testInfo) => {  // testInfo được infer tự động
```

---

### 5. `product.page.ts` — `locs` là getter trả về object mới mỗi lần gọi
```typescript
// ⚠️ src/pom/product/product.page.ts - Line 9
get locs() {
  return { ... }; // Object mới được tạo mỗi lần gọi
}
```
**Vấn đề:** Mỗi lần `this.locs.xxx` được gọi, một object literal mới được tạo ra. Tuy không gây bug (Playwright lazy-evaluates locators), nhưng không hiệu quả và có thể gây nhầm lẫn.  
**Fix:** Khởi tạo locators trong `constructor` hoặc dùng `readonly` property:
```typescript
readonly locs = {
  productTitle: this.page.getByText("Products", { exact: true }),
  // ...
};
```

---

### 6. `product.page.ts` — `sortBy` method thiếu `await` (BUG TIỀM ẨN)
```typescript
// ❌ src/pom/product/product.page.ts - Line 38-40
async sortBy(label: string) {
  await this.locs.sortDropdown(label); // ← sortDropdown gọi .selectOption() trả về Promise
}

// Trong locs:
sortDropdown: (label: string) =>
  this.page.locator(".product_sort_container").selectOption(label), // Promise chưa await
```
**Vấn đề:** `sortDropdown` trong `locs` là một function trả về `Promise<string[]>` (từ `selectOption`). Khi gọi `await this.locs.sortDropdown(label)` thì thực ra đang `await` việc **gọi function**, không phải await `selectOption`. **Tuy nhiên**, vì `sortDropdown` được định nghĩa là arrow function, khi gọi `this.locs.sortDropdown(label)` sẽ tự động gọi `.selectOption()` và trả về Promise — và `await` bên ngoài sẽ await Promise đó. Nên thực ra hoạt động đúng, nhưng **design gây nhầm lẫn** vì `sortDropdown` trong `locs` vừa là locator builder vừa thực hiện action.  
**Fix:** Tách rõ locator và action:
```typescript
// Trong locs:
sortContainer: this.page.locator(".product_sort_container"),

// Trong method:
async sortBy(label: string) {
  await this.locs.sortContainer.selectOption(label);
}
```

---

### 7. `login.spec.ts` — Tên test case bị lặp và không mô tả
```typescript
// ❌ tests/login/login.spec.ts
test("TC002: Negative fail", ...);
test("TC003: Negative fail", ...);  // ← Trùng tên
test("TC004: Negative fail", ...);  // ← Trùng tên
```
**Vấn đề:** 3 test có cùng tên `"Negative fail"` → Khó đọc report, không rõ test nào fail khi xem kết quả.  
**Fix:** Dùng tên mô tả cụ thể hơn:
```typescript
test("TC002: Login fail - empty username");
test("TC003: Login fail - empty password");
test("TC004: Login fail - empty username and password");
```

---

## 🟡 Vấn đề nhỏ (Minor)

### 8. `login.page.ts` — `productTitle` locator đặt sai chỗ
```typescript
// ⚠️ src/pom/login/login.page.ts - Line 15
productTitle: this.page.getByText("Products", { exact: true }),
```
**Vấn đề:** `productTitle` là element của **Product Page**, không phải Login Page. Locator này dùng để verify login thành công nhưng lại nằm trong `LoginPage`.  
**Fix:** Chuyển về `ProductPage` và dùng `ProductPage.locs.productTitle` để verify, hoặc tạo method `isLoginSuccess()` trong `LoginPage`.

---

### 9. `product.spec.ts` — TC007 thiếu assertion về cart badge count
```typescript
// ⚠️ tests/product/product.spec.ts - Line 76-83 (TC007)
test("TC007", { tag: ["@PRODUCT_007"] }, async ({ productPage }) => {
  await productPage.addToCart(0);
  await productPage.addToCart(1);
  await productPage.addToCart(2);
  await expect(productPage.locs.removeButtons(0)).toBeVisible();
  await expect(productPage.locs.removeButtons(1)).toBeVisible();
  await expect(productPage.locs.removeButtons(2)).toBeVisible();
  // ❌ Thiếu: await expect(productPage.locs.cartBadge).toHaveText("3");
});
```
**Fix:** Thêm assertion kiểm tra `cartBadge` hiển thị số `"3"` theo yêu cầu trong `test-case.md`.

---

### 10. `product.json` — Có data cho `PRODUCT_009` nhưng thiếu test case
```json
// tests/product/product.json
"PRODUCT_009": { "dev": [...] }  // Data có sẵn nhưng không có test
```
Đây cũng là case được đánh dấu **"Thiếu"** trong `test-case.md`. Data đã chuẩn bị nhưng test chưa được viết.

---

### 11. `utils/config.ts` — TODO comments chưa được implement
```typescript
// src/utils/config.ts
// TODO: 1. Load global config
// 2. Loas local config  ← (typo: "Loas" → "Load")
// TODO: 3. Merge global + local
```
`global.json` hiện đang **rỗng** và chưa có logic merge global config.

---

### 12. `package.json` — Thiếu npm scripts
```json
// ❌ package.json
"scripts": {}
```
**Fix:** Thêm scripts cơ bản:
```json
"scripts": {
  "test": "playwright test",
  "test:login": "playwright test --project=login",
  "test:product": "playwright test --project=chromium --grep=PRODUCT",
  "report": "playwright show-report"
}
```

---

## 📊 Tổng hợp

| Mức độ | Số lượng | Danh sách |
|--------|----------|-----------|
| 🔴 Critical | 2 | #1 Hardcode credentials, #2 BASE_URL load sai |
| 🟠 Major | 4 | #4 Type any, #5 Getter object mới, #6 sortDropdown design, #7 Tên test trùng |
| 🟡 Minor | 5 | #3 relative URL, #8 productTitle sai page, #9 TC007 thiếu assert, #10 PRODUCT_009 thiếu test, #11 TODO chưa implement, #12 thiếu scripts |

---

## 🎯 Ưu tiên fix ngay

1. **#1** — Chuyển credentials vào `.env` (`AUTH_USER`, `AUTH_PASS`)
2. **#6** — Refactor `sortDropdown` trong locs để tách locator khỏi action
3. **#7** — Đổi tên TC002/003/004 cho rõ nghĩa
4. **#9** — Thêm `cartBadge` assertion trong TC007
5. **#4** — Thêm typing cho `conf` fixture
