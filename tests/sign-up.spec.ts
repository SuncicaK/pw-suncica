import { test, expect } from '@playwright/test';
import { randomText } from '../helpers/random-text.js';

test.describe('Sign Up', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Sign up' }).click();
  });

  test('can open sign up modal', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Sign up', exact: true })).toBeVisible();
  });

  test('sign up modal has correct fields and buttons', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'Username:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password:' })).toBeVisible();

    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
    await expect(page.getByLabel('Sign up').getByText('Close')).toBeVisible();
  });

  test('cannot sign up with empty fields', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please fill out Username and Password.');
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Sign up' }).click();
  });

  test('cannot sign up with empty username', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please fill out Username and Password.');
      await dialog.accept();
    });

    await page.getByRole('textbox', { name: 'Password:' }).fill(randomText());
    await page.getByRole('button', { name: 'Sign up' }).click();
  });

  test('cannot sign up with empty password', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please fill out Username and Password.');
      await dialog.accept();
    });

    await page.getByRole('textbox', { name: 'Username:' }).fill(randomText());
    await page.getByRole('button', { name: 'Sign up' }).click();
  });

  test('cannot sign up with existing credentials', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('This user already exist.');
      await dialog.accept();
    });

    await page.getByRole('textbox', { name: 'Username:' }).fill('test');
    await page.getByRole('textbox', { name: 'Password:' }).fill('test');
    await page.getByRole('button', { name: 'Sign up' }).click();
  });

  test('can sign up with valid credentials', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Sign up successful.');
      await dialog.accept();
    });

    await page.getByRole('textbox', { name: 'Username:' }).fill(randomText());
    await page.getByRole('textbox', { name: 'Password:' }).fill(randomText());
    await page.getByRole('button', { name: 'Sign up' }).click();
  });
});
