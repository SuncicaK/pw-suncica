import type { Locator, Page } from "@playwright/test";
import NavbarSection from "../sections/navbar.section.js";
import SignUpModalSection from "../sections/sign-up-modal.section.js";

export default class SignUpModal {
  readonly page: Page;
  readonly navbar: NavbarSection;
  readonly modal: SignUpModalSection;
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarSection(page);
    this.modal = new SignUpModalSection(page);
    this.heading = this.modal.heading;
    this.usernameInput = this.modal.usernameInput;
    this.passwordInput = this.modal.passwordInput;
    this.signUpButton = this.modal.signUpButton;
    this.closeButton = this.modal.closeButton;
  }

  async goto() {
    await this.page.goto('/');
  }

  async handleDialog(message?: string) {
  await this.modal.handleDialog(message);
}

  async openModal() {
    await this.navbar.goToSignUp();
  }

  async fillUsername(username: string) {
    await this.modal.fillUsername(username);
  }

  async fillPassword(password: string) {
    await this.modal.fillPassword(password);
  }

  async signUp(username: string, password: string) {
    await this.modal.signUp(username, password);
  }
}