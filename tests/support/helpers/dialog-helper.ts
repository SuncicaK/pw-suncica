import { expect, type Page } from '@playwright/test';

export async function handleDialog(page: Page, expectedMessage?: string) {
  page.once('dialog', (dialog) => {
    if (expectedMessage) {
      expect(dialog.message()).toBe(expectedMessage);
    }
    dialog.accept();
  });
}