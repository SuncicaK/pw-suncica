import { test, expect } from '@playwright/test';
import { ContactModal } from '../pages/contact-modal.js';

test.describe('Contact', () => {
  test('can open modal', async ({ page }) => {
    await page.goto('/');
    const contactModal = new ContactModal(page);
    await contactModal.openModal();
    await expect(contactModal.modal).toBeVisible();
  });

  test('title is visible', async ({ page }) => {
    await page.goto('/');
    const contactModal = new ContactModal(page);
    await contactModal.openModal();
    await expect(contactModal.heading).toBeVisible();
  });

  test('form fields are visible', async ({ page }) => {
    await page.goto('/');
    const contactModal = new ContactModal(page);
    await contactModal.openModal();
    await expect.soft(contactModal.emailInput).toBeVisible();
    await expect.soft(contactModal.nameInput).toBeVisible();
    await expect(contactModal.messageInput).toBeVisible();
  });

  test('close and send buttons are visible', async ({ page }) => {
    await page.goto('/');
    const contactModal = new ContactModal(page);
    await contactModal.openModal();
    await expect.soft(contactModal.sendButton).toBeVisible();
    await expect(contactModal.closeButton).toBeVisible();
  });

  test('submit empty form', async ({ page }) => {
    await page.goto('/');
    const contactModal = new ContactModal(page);
    await contactModal.openModal();
    page.once('dialog', (dialog) => {
      console.log(dialog.message());
      dialog.accept();
    });
    await contactModal.sendMessage();
  });

  test('submit form with valid data', async ({ page }) => {
    await page.goto('/');
    const contactModal = new ContactModal(page);
    await contactModal.openModal();
    await contactModal.fillEmail('test@example.com');
    await contactModal.fillName('Test User');
    await contactModal.fillMessage('This is a test message.');
    await contactModal.sendMessage();
  });

  test('submit invalid data', async ({ page }) => {
    await page.goto('/');
    const contactModal = new ContactModal(page);
    await contactModal.openModal();
    await contactModal.fillEmail('invalid-email');
    await contactModal.fillName('Test User');
    await contactModal.fillMessage('!@#$%^&*()');
    page.once('dialog', (dialog) => {
      console.log(dialog.message());
      dialog.accept();
    });
    await contactModal.sendMessage();
  });

  test('close modal with close button', async ({ page }) => {
    await page.goto('/');
    const contactModal = new ContactModal(page);
    await contactModal.openModal();
    await contactModal.closeWithButton();
    await expect(contactModal.modal).toBeHidden();
  });

  test('close modal with X button', async ({ page }) => {
    await page.goto('/');
    const contactModal = new ContactModal(page);
    await contactModal.openModal();
    await contactModal.closeWithX();
    await expect(contactModal.modal).toBeHidden();
  });
});
