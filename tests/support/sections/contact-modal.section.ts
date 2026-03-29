import type { Page, Locator } from '@playwright/test';

export default class ContactModalSection {
  readonly page: Page;
  readonly modal: Locator;
  readonly contactLink: Locator;
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly nameInput: Locator;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly closeButton: Locator;
  readonly closeXButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator('#exampleModal');
    this.contactLink = page.getByRole('link', { name: 'Contact' });
    this.heading = page.getByRole('heading', { name: 'New message' });
    this.emailInput = page.locator('#recipient-email');
    this.nameInput = page.getByRole('textbox', { name: 'Contact Email: Contact Name:' });
    this.messageInput = page.getByRole('textbox', { name: 'Message:' });
    this.sendButton = page.getByRole('button', { name: 'Send message' });
    this.closeButton = page.getByLabel('New message').getByText('Close');
    this.closeXButton = page.getByRole('dialog', { name: 'New message' }).getByLabel('Close');
  }

  async openModal() {
    await this.contactLink.click();
  }

  async handleDialog() {
  this.page.once('dialog', async (dialog) => {
    await dialog.accept();
  });
} 

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
  }

  async fillMessage(message: string) {
    await this.messageInput.fill(message);
  }

  async sendMessage() {
    await this.sendButton.click();
  }

  async closeWithButton() {
    await this.closeButton.click();
  }

  async closeWithX() {
    await this.closeXButton.click();
  }
}
