import { expect, test, type Page } from "@playwright/test";

const mockCategories = [
  { id: 99, name: "Hidden", slug: "hidden", image: "https://placehold.co/200" },
  { id: 1, name: "Clothes", slug: "clothes", image: "https://placehold.co/200" },
  { id: 2, name: "Electronics", slug: "electronics", image: "https://placehold.co/200" },
  { id: 3, name: "Furniture", slug: "furniture", image: "https://placehold.co/200" },
  { id: 4, name: "Shoes", slug: "shoes", image: "https://placehold.co/200" },
];

const mockProducts = [
  {
    id: 1,
    title: "Cotton T-Shirt",
    price: 25,
    description: "A test product",
    images: ["https://placehold.co/300"],
    category: mockCategories[1],
  },
];

async function setupApiMocks(page: Page) {
  await page.route("**/api.escuelajs.co/api/v1/categories", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockCategories),
    })
  );

  await page.route(/.*api\.escuelajs\.co\/api\/v1\/products(\?.*)?$/, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockProducts),
    })
  );

  await page.route(/.*api\.escuelajs\.co\/api\/v1\/products\/(\d+)$/, (route) => {
    const id = Number(route.request().url().match(/\/products\/(\d+)$/)?.[1]);
    const product = mockProducts.find((p) => p.id === id);
    if (!product) return route.fulfill({ status: 404, body: "{}" });
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(product),
    });
  });
}

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
