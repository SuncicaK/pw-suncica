import { test, expect, type Page } from '@playwright/test';

async function openContactModal(page: Page) {
  await page.getByRole('link', { name: 'Contact' }).click();
}

test.describe('Contact', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('can open modal', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page.locator('#exampleModal')).toBeVisible();
  });

  test('title is visible', async ({ page }) => {
    await openContactModal(page);
    await expect(page.getByRole('heading', { name: 'New message' })).toBeVisible();
  });

  test('form fields are visible', async ({ page }) => {
    await openContactModal(page);
    await expect(page.locator('#recipient-email')).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'Contact Email: Contact Name:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Message:' })).toBeVisible();
  });

  test('close and send buttons are visible', async ({ page }) => {
    await openContactModal(page);

    await expect(page.getByRole('button', { name: 'Send message' })).toBeVisible();
    await expect(page.getByLabel('New message').getByText('Close')).toBeVisible();
  });

  test('submit empty form', async ({ page }) => {
    await openContactModal(page);

    page.once('dialog', (dialog) => {
      console.log(dialog.message());
      dialog.accept();
    });

    await page.getByRole('button', { name: 'Send message' }).click();
  });

  test('submit form with valid data', async ({ page }) => {
    await openContactModal(page);

    await page.locator('#recipient-email').fill('test@example.com');

    await page.getByRole('textbox', { name: 'Contact Email: Contact Name:' }).fill('Test User');

    await page
      .getByRole('textbox', { name: 'Contact Email: Contact Name:' })
      .fill('This is a test message.');
    await page.getByRole('button', { name: 'Send message' }).click();
  });

  test('submit invalid data', async ({ page }) => {
    await openContactModal(page);

    await page.locator('#recipient-email').fill('invalid-email');
    await page.getByRole('textbox', { name: 'Contact Email: Contact Name:' }).fill('Test User');
    await page.getByRole('textbox', { name: 'Contact Email: Contact Name:' }).fill('!@#$%^&*()');

    page.once('dialog', (dialog) => {
      console.log(dialog.message());
      dialog.accept();
    });

    await page.getByRole('button', { name: 'Send message' }).click();
  });

  test('close modal with close button', async ({ page }) => {
    await openContactModal(page);

    await page.getByLabel('New message').getByText('Close').click();
    await expect(page.locator('#exampleModal')).toBeHidden();
  });

  test('close modal with X button', async ({ page }) => {
    await openContactModal(page);

    await page.getByRole('dialog', { name: 'New message' }).getByLabel('Close').click();
    await expect(page.locator('#exampleModal')).toBeHidden();
  });
});
