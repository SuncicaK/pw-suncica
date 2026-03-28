import { expect, test } from "./fixtures/index.js";
import { randomText } from "./support/helpers/random-text.js";


test.describe('Sign Up', () => {
  test.beforeEach(async ({ signUpModal }) => {
    await signUpModal.openModal();
  });

  test('can open sign up modal', async ({ signUpModal }) => {
    await expect(signUpModal.heading).toBeVisible();
  });

  test('sign up modal has correct fields and buttons', async ({ signUpModal }) => {
    await expect.soft(signUpModal.usernameInput).toBeVisible();
    await expect.soft(signUpModal.passwordInput).toBeVisible();
    await expect.soft(signUpModal.signUpButton).toBeVisible();
    await expect(signUpModal.closeButton).toBeVisible();
  });

  test('cannot sign up with empty fields', async ({ signUpModal }) => {
    await signUpModal.handleDialog('Please fill out Username and Password.');
    await signUpModal.signUpButton.click();
  });

  test('cannot sign up with empty username', async ({ signUpModal }) => {
    await signUpModal.handleDialog('Please fill out Username and Password.');
    await signUpModal.fillPassword(randomText());
    await signUpModal.signUpButton.click();
  });

  test('cannot sign up with empty password', async ({ signUpModal }) => {
    await signUpModal.handleDialog('Please fill out Username and Password.');
    await signUpModal.fillUsername(randomText());
    await signUpModal.signUpButton.click();
  });

  test('cannot sign up with existing credentials', async ({ signUpModal }) => {
    await signUpModal.handleDialog('This user already exist.');
    await signUpModal.signUp('test', 'test');
  });

  test('can sign up with valid credentials', async ({ signUpModal }) => {
    await signUpModal.handleDialog('Sign up successful.');
    await signUpModal.signUp(randomText(), randomText());
  });
});