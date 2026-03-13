import { test, expect } from '@playwright/test';

test.describe('Single product page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.card-block a').first().click();
  });

  test('image is visible', async ({ page }) => {
    await expect(page.locator('#imgp img')).toBeVisible();
  });

  test('product name is visible', async ({ page }) => {
    const productName = (await page.locator('.name').textContent())?.trim();
    await expect(page.locator('h2')).toContainText(productName || '');
  });

  test('price is visible', async ({ page }) => {
    const priceText = (await page.locator('.price-container').textContent())?.trim();
    await expect(page.locator('.price-container')).toContainText(priceText || '');
  });

  test('description is visible', async ({ page }) => {
    const descriptionText = (await page.locator('#more-information').textContent())?.trim();
    await expect(page.locator('#more-information')).toContainText(descriptionText || '');
  });

  test('add to cart button is visible', async ({ page }) => {
    await expect(page.locator('text=Add to cart')).toBeVisible();
  });
});
