import { expect, test } from "./fixtures/index.js";
import { randomText } from "./support/helpers/random-text.js";


test.describe('Log In', () => {
  test.beforeEach(async ({ loginModal }) => {
    await loginModal.openModal();
  });
  test('can open log in modal', async ({ loginModal }) => {
    await expect(loginModal.heading).toBeVisible(); 
  });

  test('log in modal has correct fields and buttons', async ({ loginModal }) => {
    await expect.soft(loginModal.usernameInput).toBeVisible();
    await expect.soft(loginModal.passwordInput).toBeVisible();
    await expect.soft(loginModal.loginButton).toBeVisible();
    await expect(loginModal.closeButton).toBeVisible();
  });

  test('cannot log in with empty fields', async ({ loginModal }) => {
    await loginModal.handleDialog('Please fill out Username and Password.');
    await loginModal.clickLogin();
  });

  test('cannot log in with empty username', async ({ loginModal }) => {
    await loginModal.handleDialog('Please fill out Username and Password.');
    await loginModal.fillUsername(randomText()); 
    await loginModal.clickLogin();               
  });

  test('cannot log in with empty password', async ({ loginModal }) => {
  await loginModal.handleDialog('Please fill out Username and Password.');
    await loginModal.fillUsername(randomText()); 
    await loginModal.clickLogin();
  });

  test('cannot log in with invalid credentials', async ({ loginModal }) => {
    await loginModal.handleDialog('User does not exist.');
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