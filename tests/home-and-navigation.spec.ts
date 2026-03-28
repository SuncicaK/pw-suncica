import { expect, test } from "./fixtures/index.js";

test.describe('Home and Navigation', () => {

  test('homepage loads correctly', async ({ homeAndNavigation }) => {
    await expect.soft(homeAndNavigation.homeLink).toBeVisible();
    await expect.soft(homeAndNavigation.carousel).toBeVisible();
    await expect.soft(homeAndNavigation.productsGrid).toBeVisible();

    const count = await homeAndNavigation.productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('carousel functionality', async ({ homeAndNavigation }) => {
    await homeAndNavigation.clickPreviousCarousel();
    await homeAndNavigation.reload();
    await homeAndNavigation.clickNextCarousel();
  });

  test('main navigation exists', async ({ homeAndNavigation }) => {
    await expect.soft(homeAndNavigation.homeLink).toBeVisible();
    await expect.soft(homeAndNavigation.contactLink).toBeVisible();
    await expect.soft(homeAndNavigation.aboutLink).toBeVisible();
    await expect.soft(homeAndNavigation.cartLink).toHaveAttribute('href', 'cart.html');
    await expect.soft(homeAndNavigation.loginLink).toBeVisible();
    await expect(homeAndNavigation.signUpLink).toBeVisible();
  });

  test('category section exists', async ({ homeAndNavigation }) => {
    await expect.soft(homeAndNavigation.phonesLink).toBeVisible();
    await expect.soft(homeAndNavigation.laptopsLink).toBeVisible();
    await expect(homeAndNavigation.monitorsLink).toBeVisible();
  });

  test('categories can be filtered by Phones', async ({ homeAndNavigation }) => {
    await homeAndNavigation.filterByPhones();

    const nonPhones = ['MacBook', 'Dell', 'Apple', 'ASUS'];
    for (const product of nonPhones) {
      await expect(homeAndNavigation.productHeading(product)).toHaveCount(0);
    }
  });

  test('categories can be filtered by Laptops', async ({ homeAndNavigation }) => {
    await homeAndNavigation.filterByLaptops();

    const nonLaptops = ['Samsung', 'Nexus', 'iPhone', 'Apple'];
    for (const product of nonLaptops) {
      await expect(homeAndNavigation.productHeading(product)).toHaveCount(0);
    }
  });

  test('categories can be filtered by Monitors', async ({ homeAndNavigation }) => {
    await homeAndNavigation.filterByMonitors();

    const nonMonitors = ['Samsung', 'Nexus', 'iPhone', 'Sony', 'MacBook', 'Dell'];
    for (const product of nonMonitors) {
      await expect(homeAndNavigation.productHeading(product)).toHaveCount(0);
    }
  });

  test('product page navigation', async ({ homeAndNavigation }) => {
    await homeAndNavigation.clickRandomProduct();
    await expect(homeAndNavigation.productName).toBeVisible();
    await homeAndNavigation.clickLogoLink();
  });

  test('product arrow navigation', async ({ homeAndNavigation }) => {
    const firstProduct = await homeAndNavigation.productCardTitles.first().textContent();

    await homeAndNavigation.clickNextPage();
    await expect(homeAndNavigation.productCardTitles.first()).not.toHaveText(firstProduct || '');

    await homeAndNavigation.clickPrevPage();
    await expect(homeAndNavigation.productCardTitles.first()).toBeVisible();
  });

  test('footer visibility', async ({ homeAndNavigation }) => {
    await expect(homeAndNavigation.footer).toBeVisible();
  });
});