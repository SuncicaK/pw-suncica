import { test, expect } from '@playwright/test';
import 'dotenv/config';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Integration Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login sends correct API request', async ({ page }) => {
    if (!process.env.USERNAME || !process.env.PASSWORD) {
      throw new Error('Missing USERNAME or PASSWORD env variables');
    }

    page.on('request', (request) => {
      if (request.url().includes('logIn')) {
        expect(request.postDataJSON()).toEqual({
          username: process.env.USERNAME,
          password: process.env.PASSWORD,
        });
      }
    });

    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill(process.env.USERNAME);
    await page.locator('#loginpassword').fill(process.env.PASSWORD);
    await page.getByRole('button', { name: 'Log in' }).click();
  });

  test('sign up sends correct API request', async ({ page }) => {
    let signUpRequestMade = false;

    page.on('request', (request) => {
      if (request.url().includes('signup')) {
        signUpRequestMade = true;
        const postData = request.postDataJSON();
        expect(postData).toHaveProperty('username');
        expect(postData).toHaveProperty('password');
      }
    });

    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'Username:' }).fill('testuser123');
    await page.getByRole('textbox', { name: 'Password:' }).fill('testpass123');

    page.once('dialog', async (dialog) => await dialog.accept());
    await page.getByRole('button', { name: 'Sign up' }).click();

    await page.waitForTimeout(2000);
    expect(signUpRequestMade).toBe(true);
  });

  test('add to cart sends correct API request', async ({ page }) => {
    let addToCartRequestMade = false;

    page.on('request', (request) => {
      if (request.url().includes('addtocart')) {
        addToCartRequestMade = true;
        const postData = request.postDataJSON();
        expect(postData).toHaveProperty('id');
        expect(postData).toHaveProperty('prod_id');
      }
    });

    await page.goto('https://www.demoblaze.com/prod.html?idp_=1');
    page.once('dialog', async (dialog) => await dialog.accept());
    await page.getByRole('link', { name: 'Add to cart' }).click();

    await page.waitForTimeout(2000);
    expect(addToCartRequestMade).toBe(true);
  });
  
  test('homepage loads products from API', async ({ page }) => {
  const requestPromise = page.waitForRequest(request =>
    request.url().includes('entries')
  );

  await page.reload();

  const request = await requestPromise;
  expect(request.url()).toContain('entries');
});


test('filtering by phones sends correct API request', async ({ page }) => {
  const requestPromise = page.waitForRequest(request =>
    request.url().includes('bycat')
  );

  await page.getByRole('link', { name: 'Phones' }).click();

  const request = await requestPromise;
  expect(request.url()).toContain('bycat');

  const postData = request.postDataJSON();
  expect(postData).toHaveProperty('cat');
});

  test('login receives successful API response', async ({ page }) => {
    if (!process.env.USERNAME || !process.env.PASSWORD) {
      throw new Error('Missing USERNAME or PASSWORD env variables');
    }

  
    page.on('response', (response) => {
      if (response.url().includes('logIn')) {
        expect(response.status()).toBe(200);
      }
    });

    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill(process.env.USERNAME);
    await page.locator('#loginpassword').fill(process.env.PASSWORD);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(2000);
  });

});