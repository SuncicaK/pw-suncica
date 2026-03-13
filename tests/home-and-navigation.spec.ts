import { test, expect } from '@playwright/test';

test.describe('Home and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads correctly', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home (current)' })).toBeVisible();

    await expect(page.locator('#carouselExampleIndicators')).toBeVisible();

    await expect(page.locator('#tbodyid')).toBeVisible();

    const products = page.locator('.card');
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
  });

  test('carousel functionality', async ({ page }) => {
    await page
      .locator('#carouselExampleIndicators')
      .getByRole('button', { name: 'Previous' })
      .click();

    //added reload to make sure the carousel animation is reset before clicking the next button
    await page.reload();

    await page.locator('#carouselExampleIndicators').getByRole('button', { name: 'Next' }).click();
  });

  test('main navigation exists', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home (current)' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About us' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cart' })).toHaveAttribute('href', 'cart.html');
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
  });

  test('category section exists', async ({ page }) => {
    await page.locator('div').filter({ hasText: 'CATEGORIES Phones Laptops' }).nth(2).isVisible();

    await expect(page.getByRole('link', { name: 'Phones' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Laptops' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Monitors' })).toBeVisible();
  });

  test('categories can be filtered by Phones', async ({ page }) => {
    await page.getByRole('link', { name: 'Phones' }).click();

    const nonPhones = ['MacBook', 'Dell', 'Apple', 'ASUS'];

    for (const product of nonPhones) {
      await expect(page.getByRole('heading', { name: product })).toHaveCount(0);
    }
  });

  test('categories can be filtered by Laptops', async ({ page }) => {
    await page.getByRole('link', { name: 'Laptops' }).click();

    const nonLaptops = ['Samsung', 'Nexus', 'iPhone', 'Apple'];

    for (const product of nonLaptops) {
      await expect(page.getByRole('heading', { name: product })).toHaveCount(0);
    }
  });

  test('categories can be filtered by Monitors', async ({ page }) => {
    await page.getByRole('link', { name: 'Monitors' }).click();

    const nonMonitors = ['Samsung', 'Nexus', 'iPhone', 'Sony', 'MacBook', 'Dell'];

    for (const product of nonMonitors) {
      await expect(page.getByRole('heading', { name: product })).toHaveCount(0);
    }
  });

  test('product page navigation', async ({ page }) => {
    const products = page.locator('#tbodyid .card-title');
    const randomProduct = products.nth(Math.floor(Math.random() * (await products.count())));
    await randomProduct.click();
    await expect(page.locator('.name')).toBeVisible();

    await page.getByRole('link', { name: 'PRODUCT STORE' }).click();
  });

  test('product arrow navigation', async ({ page }) => {
    const firstProduct = await page.locator('#tbodyid .card-title').first().textContent();

    await page.locator('#next2').click();
    await expect(page.locator('#tbodyid .card-title').first()).not.toHaveText(firstProduct || '');

    await page.locator('#prev2').click();
    await expect(page.locator('#tbodyid .card-title').first()).toBeVisible();
  });

  test('footer visibility', async ({ page }) => {
    await expect(page.locator('#footc')).toBeVisible();
  });
});
