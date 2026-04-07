import { expect, test } from "./fixtures/index.js";

test.describe('Single product page', () => {

  test('image is visible', async ({ singleProduct }) => {
    await singleProduct.firstProductLink.click();
    await expect(singleProduct.image).toBeVisible();
  });

  test('product name is visible', async ({ singleProduct }) => {
    await singleProduct.firstProductLink.click();
    const productName = (await singleProduct.name.textContent())?.trim();
    await expect(singleProduct.heading).toContainText(productName || '');
  });

  test('price is visible', async ({ singleProduct }) => {
    await singleProduct.firstProductLink.click();
    const priceText = (await singleProduct.price.textContent())?.trim();
    await expect(singleProduct.price).toContainText(priceText || '');
  });

  test('description is visible', async ({ singleProduct }) => {
    await singleProduct.firstProductLink.click();
    const descriptionText = (await singleProduct.description.textContent())?.trim();
    await expect(singleProduct.description).toContainText(descriptionText || '');
  });

  test('add to cart button is visible', async ({ singleProduct }) => {
    await singleProduct.firstProductLink.click();
    await expect(singleProduct.addToCartButton).toBeVisible();
  });
});