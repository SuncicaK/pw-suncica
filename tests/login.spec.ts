import { expect, test } from './fixtures/index.js';
import { handleDialog } from './support/helpers/dialog-helper.js';
import { randomText } from './support/helpers/random-text.js';
import 'dotenv/config';

test.describe('Log In', () => {

  test('can open log in modal', async ({ navbar, loginModal }) => {
    await navbar.loginLink.click();
    await expect(loginModal.heading).toBeVisible();
  });

  test('log in modal has correct fields and buttons', async ({ navbar, loginModal }) => {
    await navbar.loginLink.click();
    await expect.soft(loginModal.usernameInput).toBeVisible();
    await expect.soft(loginModal.passwordInput).toBeVisible();
    await expect.soft(loginModal.loginButton).toBeVisible();
    await expect(loginModal.closeButton).toBeVisible();
  });

  test('cannot log in with empty fields', async ({ page, navbar, loginModal }) => {
    await navbar.loginLink.click();
    await handleDialog(page, 'Please fill out Username and Password.');
    await loginModal.clickLogin();
  });

  test('cannot log in with empty username', async ({ page, navbar, loginModal }) => {
    await navbar.loginLink.click();
    await handleDialog(page, 'Please fill out Username and Password.');
    await loginModal.fillUsername(randomText());
    await loginModal.clickLogin();
  });

  test('cannot log in with empty password', async ({ page, navbar, loginModal }) => {
    await navbar.loginLink.click();
    await handleDialog(page, 'Please fill out Username and Password.');
    await loginModal.fillUsername(randomText());
    await loginModal.clickLogin();
  });

  test('cannot log in with invalid credentials', async ({ page, navbar, loginModal }) => {
    await navbar.loginLink.click();
    await handleDialog(page, 'User does not exist.');
    await loginModal.login(randomText(), randomText());
  });

  test('can log in with valid credentials', async ({ page, navbar, loginModal }) => {
    if (!process.env.USERNAME || !process.env.PASSWORD) {
      throw new Error('Missing USERNAME or PASSWORD env variables');
    }

    await navbar.loginLink.click();
    await loginModal.login(process.env.USERNAME, process.env.PASSWORD);
    await expect(page.getByRole('link', { name: `Welcome ${process.env.USERNAME}` })).toBeVisible({ timeout: 15000 });
  });

  test('can log out after logging in', async ({ page, navbar, loginModal }) => {
    if (!process.env.USERNAME || !process.env.PASSWORD) {
      throw new Error('Missing USERNAME or PASSWORD env variables');
    }

    await navbar.loginLink.click();
    await loginModal.login(process.env.USERNAME, process.env.PASSWORD);
    await page.getByRole('link', { name: `Welcome ${process.env.USERNAME}` }).click();
    await page.getByRole('link', { name: 'Log out' }).click();
    await expect(page.getByRole('link', { name: `Welcome ${process.env.USERNAME}` })).not.toBeVisible({ timeout: 15000 });
  });
});