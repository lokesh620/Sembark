import { expect, test } from "@playwright/test";
import { mockProducts, setupApiMocks } from "./fixtures/mockApi";

test.describe("Header", () => {
  test.beforeEach(async ({ page }) => {
    await setupApiMocks(page);
  });

  test("brand link navigates back to home", async ({ page }) => {
    await page.goto("/cart");
    await page.getByRole("link", { name: "Sembark" }).click();
    await expect(page).toHaveURL(/^http:\/\/localhost:5173\/(\?.*)?$/);
  });

  test("cart badge starts at 0 and updates as items are added", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /cart, 0 items/i })).toBeVisible();

    const product = mockProducts[0];
    await page.goto(`/product/${product.id}/details`);
    await page.getByRole("button", { name: `Add ${product.title} to cart` }).click();

    await expect(page.getByRole("link", { name: /cart, 1 item/i })).toBeVisible();

    await page.getByRole("button", { name: `Add ${product.title} to cart` }).click();
    // Same product → quantity goes up but cart length stays at 1 unique item
    await expect(page.getByRole("link", { name: /cart, 1 item/i })).toBeVisible();
  });

  test("cart link navigates to /cart", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /cart, 0 items/i }).click();
    await expect(page).toHaveURL(/\/cart$/);
    await expect(page.getByRole("heading", { name: "Your Cart" })).toBeVisible();
  });
});
