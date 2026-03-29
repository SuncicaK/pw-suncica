
import NavbarSection from "../sections/navbar.section.js";
import AboutModalSection from "../sections/about-modal.section.js";
import type { Locator, Page } from "@playwright/test";

export default class AboutModal {
  readonly page: Page;
  readonly navbar: NavbarSection;
  readonly modal: AboutModalSection;
  readonly heading: Locator;
  readonly videoPoster: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarSection(page);
    this.modal = new AboutModalSection(page);
    this.heading = this.modal.heading;
    this.videoPoster = this.modal.videoPoster;
  }

  async goto() {
    await this.page.goto('/');
  }

  async openModal() {
    await this.navbar.goToAbout();
  }

  async play() {
    await this.modal.play();
  }

  async pause() {
    await this.modal.pause();
  }

  async fullscreen() {
    await this.modal.fullscreen();
  }

  async isVideoPlaying(): Promise<boolean> {
    return this.modal.isVideoPlaying();
  }

  async closeWithButton() {
    await this.modal.closeWithButton();
  }

  async closeWithX() {
    await this.modal.closeWithX();
  }
}