import { test as setup, expect } from '@playwright/test';
import { LoginModalSection } from '../../pages/login-modal.section.js';
import { NavbarSection } from '../../pages/navbar.section.js';
import { STORAGE_STATE } from '../../playwright.config.js';
import 'dotenv/config';

setup('Log in', async ({ page }) => {
  const loginModal = new LoginModalSection(page);
  const navbar = new NavbarSection(page);

  await page.goto('/');

  await page.getByRole('link', { name: 'Log in' }).click();

  await loginModal.login(process.env.USERNAME!, process.env.PASSWORD!);

  await expect(navbar.loggedInUser).toBeVisible({ timeout: 20000 });

  await page.context().storageState({ path: STORAGE_STATE });
});