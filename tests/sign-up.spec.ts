import { expect, test } from "./fixtures/index.js";
import { handleDialog } from "./support/helpers/dialog-helper.js";
import { randomText } from "./support/helpers/random-text.js";

test.describe('Sign Up', () => {

  test('can open sign up modal', async ({ navbar, signUpModal }) => {
    await navbar.signUpLink.click();
    await expect(signUpModal.heading).toBeVisible();
  });

  test('sign up modal has correct fields and buttons', async ({ navbar, signUpModal }) => {
    await navbar.signUpLink.click();
    await expect.soft(signUpModal.usernameInput).toBeVisible();
    await expect.soft(signUpModal.passwordInput).toBeVisible();
    await expect.soft(signUpModal.signUpButton).toBeVisible();
    await expect(signUpModal.closeButton).toBeVisible();
  });

  test('cannot sign up with empty fields', async ({ page, navbar, signUpModal }) => { 
    await navbar.signUpLink.click();
    await handleDialog(page, 'Please fill out Username and Password.');
    await signUpModal.signUpButton.click();
  });

  test('cannot sign up with empty username', async ({ page, navbar, signUpModal }) => {
    await navbar.signUpLink.click();
    await handleDialog(page, 'Please fill out Username and Password.');
    await signUpModal.fillPassword(randomText());
    await signUpModal.signUpButton.click();
  });

  test('cannot sign up with empty password', async ({ page, navbar, signUpModal }) => {
    await navbar.signUpLink.click();
    await handleDialog(page, 'Please fill out Username and Password.');
    await signUpModal.fillUsername(randomText());
    await signUpModal.signUpButton.click();
  });

  test('cannot sign up with existing credentials', async ({ page, navbar, signUpModal }) => {
    await navbar.signUpLink.click();
    await handleDialog(page, 'This user already exist.');
    await signUpModal.signUp('test', 'test');
  });

  test('can sign up with valid credentials', async ({ page, navbar, signUpModal }) => {
    await navbar.signUpLink.click();
    await handleDialog(page, 'Sign up successful.');
    await signUpModal.signUp(randomText(), randomText());
  });
});