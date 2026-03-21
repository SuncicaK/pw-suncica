import { test as base } from '@playwright/test';
import { LoginModal } from '../pages/login-modal.js';

type PWFixtures = {
  loginModal: LoginModal;
};

export const test = base.extend<PWFixtures>({
  loginModal: async ({ page }, use) => {
    await page.goto('/');
    const loginModal = new LoginModal(page);
    await loginModal.openModal();
    await use(loginModal);
  },
});

export { expect } from '@playwright/test';
