import { test, expect } from '@playwright/test';
import { randomText } from '../helpers/random-text.js';

test.describe('Log In', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Log in' }).click();
  });

  test('can open log in modal', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Log in', exact: true })).toBeVisible();
  });

  test('log in modal has correct fields and buttons', async ({ page }) => {
    await expect.soft(page.locator('#loginusername')).toBeVisible();
    await expect.soft(page.locator('#loginpassword')).toBeVisible();

    await expect.soft(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    await expect(page.getByLabel('Log in').getByText('Close')).toBeVisible();
  });

  test('cannot log in with empty fields', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please fill out Username and Password.');
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Log in' }).click();
  });

  test('cannot log in with empty username', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please fill out Username and Password.');
      await dialog.accept();
    });

    await page.locator('#loginusername').fill(randomText());
    await page.getByRole('button', { name: 'Log in' }).click();
  });

  test('cannot log in with empty password', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please fill out Username and Password.');
      await dialog.accept();
    });

    await page.locator('#loginusername').fill(randomText());
    await page.getByRole('button', { name: 'Log in' }).click();
  });

  test('cannot log in with invalid credentials', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('User does not exist.');
      await dialog.accept();
    });

    await page.locator('#loginusername').fill(randomText());
    await page.locator('#loginpassword').fill(randomText());
    await page.getByRole('button', { name: 'Log in' }).click();
  });

  test('can log in with valid credentials', async ({ page }) => {
    await page.locator('#loginusername').fill('PW Suncica');
    await page.locator('#loginpassword').fill('pw-suncica');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByRole('link', { name: 'Welcome PW Suncica' })).toBeVisible();
  });

  test('can log out after logging in', async ({ page }) => {
    await page.locator('#loginusername').fill('PW Suncica');
    await page.locator('#loginpassword').fill('pw-suncica');
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.getByRole('link', { name: 'Welcome PW Suncica' }).click();
    await page.getByRole('link', { name: 'Log out' }).click();

    await expect(page.getByRole('link', { name: 'Welcome PW Suncica' })).not.toBeVisible();
  });
});
