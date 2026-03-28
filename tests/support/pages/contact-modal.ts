import type { Locator, Page } from "@playwright/test";
import NavbarSection from "../sections/navbar.section.js";
import { ContactModalSection } from "../sections/contact-modal.section.js";

export default class ContactModal {
  readonly page: Page;
  private navbar: NavbarSection;
  private modal: ContactModalSection;
  readonly modalLocator: Locator;
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly nameInput: Locator;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarSection(page);
    this.modal = new ContactModalSection(page);
    this.modalLocator = this.modal.modal;
    this.heading = this.modal.heading;
    this.emailInput = this.modal.emailInput;
    this.nameInput = this.modal.nameInput;
    this.messageInput = this.modal.messageInput;
    this.sendButton = this.modal.sendButton;
    this.closeButton = this.modal.closeButton;
  }

  public async goto() {
    await this.page.goto('/');
  }

  async openModal() {
    await this.navbar.goToContact();
  }

  async handleDialog() {
  await this.modal.handleDialog();
}

  async fillEmail(email: string) {
    await this.modal.fillEmail(email);
  }

  async fillName(name: string) {
    await this.modal.fillName(name);
  }

  async fillMessage(message: string) {
    await this.modal.fillMessage(message);
  }

  async sendMessage() {
    await this.modal.sendMessage();
  }

  async closeWithButton() {
    await this.modal.closeWithButton();
  }

  async closeWithX() {
    await this.modal.closeWithX();
  }
}