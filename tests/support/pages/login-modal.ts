import type { Locator, Page } from "@playwright/test";
import NavbarSection from "../sections/navbar.section.js";
import LoginModalSection from "../sections/login-modal.section.js";

export default class LoginModal {
  readonly page: Page;
  readonly navbar: NavbarSection;
  readonly modal: LoginModalSection;
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarSection(page);
    this.modal = new LoginModalSection(page);
    this.heading = this.modal.heading;
    this.usernameInput = this.modal.usernameInput;
    this.passwordInput = this.modal.passwordInput;
    this.loginButton = this.modal.loginButton;
    this.closeButton = this.modal.closeButton;
  }

   async goto() {
    await this.page.goto('/');
  }

async handleDialog(message?: string) {
  await this.modal.handleDialog(message);
}

  async openModal() {
    await this.navbar.goToLogin();
  }

  welcomeLink(name: string): Locator {
    return this.page.getByRole('link', { name: `Welcome ${name}` });
  }

  async fillUsername(username: string) {
    await this.modal.fillUsername(username);
  }

  async fillPassword(password: string) {
    await this.modal.fillPassword(password);
  }

  async clickLogin() {
    await this.modal.clickLogin();
  }

  async login(username: string, password: string) {
    await this.modal.login(username, password);
  }

  async logout(username: string) {
    await this.welcomeLink(username).click();
    await this.page.getByRole('link', { name: 'Log out' }).click();
  }
}