import { type Locator, type Page } from '@playwright/test';

export class SignUpModalSection {
  readonly page: Page;
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Sign up', exact: true });
    this.usernameInput = page.getByRole('textbox', { name: 'Username:' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password:' });
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.closeButton = page.getByLabel('Sign up').getByText('Close');
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }
  
  async signUp(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.signUpButton.click();
  }
}