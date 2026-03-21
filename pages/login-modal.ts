import type { Page, Locator } from '@playwright/test';

export class LoginModal {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly closeButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.closeButton = page.getByLabel('Log in').getByText('Close');
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
  }

  welcomeLink(name: string): Locator {
    return this.page.getByRole('link', { name: `Welcome ${name}` });
  }

  async openModal() {
    await this.loginLink.click();
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async logout(username: string) {
    await this.welcomeLink(username).click();
    await this.logoutLink.click();
  }
}
