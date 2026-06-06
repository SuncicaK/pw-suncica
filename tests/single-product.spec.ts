import { expect, test } from "./fixtures/index.js";

test.describe('Single product page', () => {

  test('image is visible', async ({ page, singleProduct }) => {
    await page.route('https://api.demoblaze.com/entries', async (route) => {
      await route.fulfill({ path: 'data/entries.json' });
    });
    
    await page.route('https://api.demoblaze.com/view', async (route) => {
      await route.fulfill({ path: 'data/product.json' });
    });

    await singleProduct.firstProductLink.click();
    await expect(singleProduct.image).toBeVisible();
  });

  test('product name is visible', async ({ page, singleProduct }) => {
    await page.route('https://api.demoblaze.com/entries', async (route) => {
      await route.fulfill({ path: 'data/entries.json' });
    });
    await page.route('https://api.demoblaze.com/view', async (route) => {
      await route.fulfill({ path: 'data/product.json' });
    });

    await singleProduct.firstProductLink.click();
    const productName = (await singleProduct.name.textContent())?.trim();
    await expect(singleProduct.heading).toContainText(productName || '');
  });

  test('price is visible', async ({ page, singleProduct }) => {
    await page.route('https://api.demoblaze.com/entries', async (route) => {
      await route.fulfill({ path: 'data/entries.json' });
    });
    await page.route('https://api.demoblaze.com/view', async (route) => {
      await route.fulfill({ path: 'data/product.json' });
    });

    await singleProduct.firstProductLink.click();
    const priceText = (await singleProduct.price.textContent())?.trim();
    await expect(singleProduct.price).toContainText(priceText || '');
  });

  test('description is visible', async ({ page, singleProduct }) => {
    await page.route('https://api.demoblaze.com/entries', async (route) => {
      await route.fulfill({ path: 'data/entries.json' });
    });
    await page.route('https://api.demoblaze.com/view', async (route) => {
      await route.fulfill({ path: 'data/product.json' });
    });

    await singleProduct.firstProductLink.click();
    const descriptionText = (await singleProduct.description.textContent())?.trim();
    await expect(singleProduct.description).toContainText(descriptionText || '');
  });

  test('add to cart button is visible', async ({ page, singleProduct }) => {
    await page.route('https://api.demoblaze.com/entries', async (route) => {
      await route.fulfill({ path: 'data/entries.json' });
    });
    await page.route('https://api.demoblaze.com/view', async (route) => {
      await route.fulfill({ path: 'data/product.json' });
    });

    await singleProduct.firstProductLink.click();
    await expect(singleProduct.addToCartButton).toBeVisible();
  });
});