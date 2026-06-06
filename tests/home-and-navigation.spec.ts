import { expect, test } from "./fixtures/index.js";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Home and Navigation', () => {

  test('homepage loads correctly', async ({ page, navbar, home }) => {
    await page.route('https://api.demoblaze.com/entries', async (route) => {
      await route.fulfill({ path: 'data/entries.json' });
    });

    await expect.soft(navbar.homeLink).toBeVisible();
    await expect.soft(home.carousel).toBeVisible();
    await expect(home.productsGrid).toBeVisible();
    const count = await home.productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('carousel functionality', async ({ home }) => {
    await home.carouselPrevButton.click();
    await home.page.reload();    
    await home.carouselNextButton.click();
  });

  test('main navigation exists', async ({ navbar }) => {
    await expect.soft(navbar.homeLink).toBeVisible();
    await expect.soft(navbar.contactLink).toBeVisible();
    await expect.soft(navbar.aboutLink).toBeVisible();
    await expect.soft(navbar.cartLink).toHaveAttribute('href', 'cart.html');
    await expect.soft(navbar.loginLink).toBeVisible();
    await expect(navbar.signUpLink).toBeVisible();
  });

  test('category section exists', async ({ home }) => {
    await expect.soft(home.phonesLink).toBeVisible();
    await expect.soft(home.laptopsLink).toBeVisible();
    await expect(home.monitorsLink).toBeVisible();
  });

  test('categories can be filtered by Phones', async ({ page, home }) => {
    await page.route('https://api.demoblaze.com/bycat', async (route) => {
      await route.fulfill({ path: 'data/phones.json' });
    });

    await home.phonesLink.click();
    const nonPhones = ['MacBook', 'Dell', 'Apple', 'ASUS'];
    for (const product of nonPhones) {
      await expect(home.productHeading(product)).toHaveCount(0);
    }
  });

  test('categories can be filtered by Laptops', async ({ page, home }) => {
    await page.route('https://api.demoblaze.com/bycat', async (route) => {
      await route.fulfill({ path: 'data/laptops.json' });
    });

    await home.laptopsLink.click();
    const nonLaptops = ['Samsung', 'Nexus', 'iPhone', 'Apple'];
    for (const product of nonLaptops) {
      await expect(home.productHeading(product)).toHaveCount(0);
    }
  });

  test('categories can be filtered by Monitors', async ({ page, home }) => {
    await page.route('https://api.demoblaze.com/bycat', async (route) => {
      await route.fulfill({ path: 'data/monitors.json' });
    });

    await home.monitorsLink.click();
    const nonMonitors = ['Samsung', 'Nexus', 'iPhone', 'Sony', 'MacBook', 'Dell'];
    for (const product of nonMonitors) {
      await expect(home.productHeading(product)).toHaveCount(0);
    }
  });

 test('product page navigation', async ({ page, home }) => {
  await page.route('https://api.demoblaze.com/entries', async (route) => {
    await route.fulfill({ path: 'data/entries.json' });
  });
  await page.route('https://api.demoblaze.com/view', async (route) => {
    await route.fulfill({ path: 'data/product.json' });
  });

  await home.clickRandomProduct();
  await expect(home.productName).toBeVisible();
  await home.logoLink.click();
});

  test('product arrow navigation', async ({ page, home }) => {
    await page.route('https://api.demoblaze.com/entries', async (route) => {
      await route.fulfill({ path: 'data/entries.json' });
    });

    const firstProduct = await home.productCardTitles.first().textContent();
    await home.nextButton.click();
    await expect(home.productCardTitles.first()).not.toHaveText(firstProduct || '');
    await home.prevButton.click();
    await expect(home.productCardTitles.first()).toBeVisible();
  });

  test('footer visibility', async ({ home }) => {
    await expect(home.footer).toBeVisible();
  });
});