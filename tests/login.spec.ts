import { expect, test } from '../fixtures/index.js';
import { randomText } from '../helpers/random-text.js';

test.describe('Log In', () => {
  test('can open log in modal', async ({ loginModal }) => {
    await expect(
      loginModal.page.getByRole('heading', { name: 'Log in', exact: true })
    ).toBeVisible();
  });

  test('log in modal has correct fields and buttons', async ({ loginModal }) => {
    await expect.soft(loginModal.usernameInput).toBeVisible();
    await expect.soft(loginModal.passwordInput).toBeVisible();
    await expect.soft(loginModal.loginButton).toBeVisible();
    await expect(loginModal.closeButton).toBeVisible();
  });

  test('cannot log in with empty fields', async ({ loginModal }) => {
    loginModal.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please fill out Username and Password.');
      await dialog.accept();
    });

    await loginModal.clickLogin();
  });

  test('cannot log in with empty username', async ({ loginModal }) => {
    loginModal.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please fill out Username and Password.');
      await dialog.accept();
    });

    await loginModal.fillUsername(randomText());
    await loginModal.clickLogin();
  });

  test('cannot log in with empty password', async ({ loginModal }) => {
    loginModal.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please fill out Username and Password.');
      await dialog.accept();
    });

    await loginModal.fillUsername(randomText());
    await loginModal.clickLogin();
  });

  test('cannot log in with invalid credentials', async ({ loginModal }) => {
    loginModal.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('User does not exist.');
      await dialog.accept();
    });

    await loginModal.login(randomText(), randomText());
  });

  test('can log in with valid credentials', async ({ loginModal }) => {
    await loginModal.login('PW Suncica', 'pw-suncica');
    await expect(loginModal.welcomeLink('PW Suncica')).toBeVisible();
  });

  test('can log out after logging in', async ({ loginModal }) => {
    await loginModal.login('PW Suncica', 'pw-suncica');

    await loginModal.logout('PW Suncica');
    await expect(loginModal.welcomeLink('PW Suncica')).not.toBeVisible();
  });
});
