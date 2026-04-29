import { test, expect } from "@playwright/test";
import { ContactModalSection } from "../pages/contact-modal.section.js";
import { handleDialog } from "./support/helpers/dialog-helper.js";

test.describe('Contact', () => {


  test('can open modal', async ({ page }) => {
     const contactModal = new ContactModalSection(page);
    await contactModal.goto();
    await contactModal.openModal();
    await expect(contactModal.modal).toBeVisible();
  });

  test('title is visible', async ({ page }) => {
    const contactModal = new ContactModalSection(page);
    await contactModal.goto();
    await contactModal.openModal();
    await expect(contactModal.heading).toBeVisible();
  });

  test('form fields are visible', async ({ page }) => {
   const contactModal = new ContactModalSection(page);
    await contactModal.goto();
    await contactModal.openModal();
    await expect.soft(contactModal.emailInput).toBeVisible();
    await expect.soft(contactModal.nameInput).toBeVisible();
    await expect(contactModal.messageInput).toBeVisible();
  });

  test('close and send buttons are visible', async ({ page }) => {
      const contactModal = new ContactModalSection(page);
    await contactModal.goto();
    await contactModal.openModal();
    await expect.soft(contactModal.sendButton).toBeVisible();
    await expect(contactModal.closeButton).toBeVisible();
  });

  test('submit empty form', async ({ page }) => {
    const contactModal = new ContactModalSection(page);
    await contactModal.goto();
    await contactModal.openModal();
    await handleDialog(page);
    await contactModal.sendMessage();
  });

  test('submit form with valid data', async ({ page }) => {
      const contactModal = new ContactModalSection(page);
    await contactModal.goto();
    await contactModal.openModal();
    await contactModal.fillEmail('test@example.com');
    await contactModal.fillName('Test User');
    await contactModal.fillMessage('This is a test message.');
    await contactModal.sendMessage();
  });

  test('submit invalid data', async ({ page }) => {
    const contactModal = new ContactModalSection(page);
    await contactModal.goto();
    await contactModal.openModal();
    await contactModal.fillEmail('invalid-email');
    await contactModal.fillName('Test User');
    await contactModal.fillMessage('!@#$%^&*()');
    await handleDialog(page);
    await contactModal.sendMessage();
  });

  test('close modal with close button', async ({ page }) => {
    const contactModal = new ContactModalSection(page);
    await contactModal.goto();
    await contactModal.openModal();
    await contactModal.closeButton.click();
    await expect(contactModal.modal).toBeHidden();
  });

  test('close modal with X button', async ({ page }) => {
    const contactModal = new ContactModalSection(page);
    await contactModal.goto();        // CHANGED
    await contactModal.openModal();
    await contactModal.closeXButton.click();
    await expect(contactModal.modal).toBeHidden();
  });
});