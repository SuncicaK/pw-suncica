import { test, expect, type Page } from '@playwright/test';
import { randomText } from './support/helpers/random-text.js';

test.describe.serial('Cart', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('cart loads correctly', async () => {
    await page.goto('cart.html');
    await expect.soft(page.getByRole('heading', { name: 'Products' })).toBeVisible();
    await expect.soft(page.getByRole('table')).toBeVisible();
    await expect.soft(page.getByRole('heading', { name: 'Total' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Place Order' })).toBeVisible();
  });

  test('place order with empty cart', async () => {
    await page.goto('cart.html');

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please fill out Name and Creditcard.');
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.getByRole('button', { name: 'Purchase' }).click();
  });

  test('add 3 products to cart', async () => {
    const productUrls = [
      'https://www.demoblaze.com/prod.html?idp_=1',
      'https://www.demoblaze.com/prod.html?idp_=2',
      'https://www.demoblaze.com/prod.html?idp_=3',
    ];

    for (const url of productUrls) {
      await page.goto(url);

      page.once('dialog', async (dialog) => {
        await dialog.accept();
      });
      await page.getByRole('link', { name: 'Add to cart' }).click();
      await page.waitForTimeout(1500);
    }
  });

  test('verify products in cart', async () => {
    await page.goto('https://www.demoblaze.com/cart.html');

    const rows = page.locator('#tbodyid tr');
    await expect(rows.first()).toBeVisible({ timeout: 10000 });

    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('delete one product from cart', async () => {
    await page.goto('https://www.demoblaze.com/cart.html');

    const rows = page.locator('#tbodyid tr');
    await rows.first().waitFor({ timeout: 10000 });
    const initialCount = await rows.count();

    if (initialCount > 0) {
      await page.getByRole('link', { name: 'Delete' }).first().click();
      await page.waitForTimeout(1500);
      await expect(rows).toHaveCount(initialCount - 1);
    }
  });
test('place order with valid data', async () => {
  page.once('dialog', async (dialog) => {
    await dialog.accept();
  });

  await page.goto('https://www.demoblaze.com/prod.html?idp_=1');
  await page.getByRole('link', { name: 'Add to cart' }).click();

  await page.goto('https://www.demoblaze.com/cart.html');

  const rows = page.locator('#tbodyid tr');
  await expect(rows.first()).toBeVisible();

  await page.getByRole('button', { name: 'Place Order' }).click();

  const modal = page.getByRole('dialog', { name: 'Place order' });
  await expect(modal).toBeVisible();


  await modal.getByRole('textbox', { name: /Name:/ }).fill(randomText());
  await page.getByLabel('Country:').fill(randomText());
  await page.getByLabel('City:').fill(randomText());
  await page.getByLabel('Credit card:').fill('4111111111111111');
  await page.getByLabel('Month:').fill('12');
  await page.getByLabel('Year:').fill('2025');

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Thank you for your purchase!');
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Purchase' }).click();

  await expect(
    page.getByRole('heading', { name: 'Thank you for your purchase!' })
  ).toBeVisible();

  await page.getByRole('button', { name: 'OK' }).click();
});
});