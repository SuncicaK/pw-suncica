import { expect, test } from "./fixtures/index.js";
import { handleDialog } from "./support/helpers/dialog-helper.js";
import { randomText } from "./support/helpers/random-text.js";

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
    await navbar.loginLink.click();
    await loginModal.login('PW Suncica', 'pw-suncica');
    await expect(page.getByRole('link', { name: 'Welcome PW Suncica' })).toBeVisible();
  });

  test('can log out after logging in', async ({ page, navbar, loginModal }) => {
    await navbar.loginLink.click();
    await loginModal.login('PW Suncica', 'pw-suncica');
    await page.getByRole('link', { name: 'Welcome PW Suncica' }).click();
    await page.getByRole('link', { name: 'Log out' }).click();
    await expect(page.getByRole('link', { name: 'Welcome PW Suncica' })).not.toBeVisible();
  });
});