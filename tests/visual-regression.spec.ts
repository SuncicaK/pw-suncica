import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#tbodyid').waitFor();
  });

  test('full page', async ({ page }) => {
    await expect(page).toHaveScreenshot('full-page.png', {
      fullPage: true,
      mask: [page.locator('#carouselExampleIndicators')],
      maxDiffPixels: 200,
    });
  });

  test('navbar', async ({ page }) => {
    await expect(page.locator('.navbar')).toHaveScreenshot('navbar.png', {
      maxDiffPixels: 50,
    });
  });

  test('carousel', async ({ page }) => {
    await page.locator('#carouselExampleIndicators').waitFor();
    await expect(page.locator('#carouselExampleIndicators')).toHaveScreenshot('carousel.png', {
      animations: 'disabled',
      maxDiffPixels: 100,
    });
  });

  test('product grid', async ({ page }) => {
    await expect(page.locator('#tbodyid')).toHaveScreenshot('product-grid.png', {
      maxDiffPixels: 100,
    });
  });

  test('categories', async ({ page }) => {
    await expect(page.locator('.list-group')).toHaveScreenshot('categories.png', {
      maxDiffPixels: 50,
    });
  });

  test('footer', async ({ page }) => {
    await expect(page.locator('#footc')).toHaveScreenshot('footer.png', {
      maxDiffPixels: 50,
    });
  });

  test('login modal', async ({ page }) => {
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#logInModal').waitFor();
    await expect(page.locator('#logInModal')).toHaveScreenshot('login-modal.png', {
      maxDiffPixels: 50,
    });
  });

  test('contact modal', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click();
    await page.locator('#exampleModal').waitFor();
    await expect(page.locator('#exampleModal')).toHaveScreenshot('contact-modal.png', {
      maxDiffPixels: 50,
    });
  });
});