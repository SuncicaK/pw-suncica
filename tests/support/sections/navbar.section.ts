import type { Locator, Page } from "@playwright/test";

export default class NavbarSection {
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

  async goToHome() {
    await this.homeLink.click();
  }

  async goToContact() {
    await this.contactLink.click();
  }

  async goToAbout() {
    await this.aboutLink.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async goToLogin() {
    await this.loginLink.click();
  }

  async goToSignUp() {
    await this.signUpLink.click();
  }
}