import type { Locator, Page } from '@playwright/test';

export class NavbarSection {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly contactLink: Locator;
  readonly aboutLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: 'Home (current)' });
    this.contactLink = page.getByRole('link', { name: 'Contact' });
    this.aboutLink = page.getByRole('link', { name: 'About us' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
  }
}