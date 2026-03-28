import type { Locator, Page } from "@playwright/test";


export default class AboutModalSection {
  readonly page: Page;
  readonly heading: Locator;
  readonly videoPoster: Locator;
  readonly playButton: Locator;
  readonly pauseButton: Locator;
  readonly fullscreenButton: Locator;
  readonly closeButton: Locator;
  readonly closeXButton: Locator;
  readonly videoElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'About us', exact: true });
    this.videoPoster = page.locator('.vjs-poster');
    this.playButton = page.getByRole('button', { name: 'Play Video' });
    this.pauseButton = page.getByRole('button', { name: 'Pause' });
    this.fullscreenButton = page.getByRole('button', { name: 'Fullscreen' });
    this.closeButton = page.locator('#videoModal').getByText('Close', { exact: true });
    this.closeXButton = page.locator('#videoModal').getByLabel('Close');
    this.videoElement = page.locator('#example-video_html5_api');
  }

  async play() {
    await this.playButton.click();
  }

  async pause() {
    await this.pauseButton.click();
  }

  async fullscreen() {
    await this.fullscreenButton.click();
  }

  async isVideoPlaying(): Promise<boolean> {
    return this.videoElement.evaluate((v: HTMLVideoElement) => !v.paused);
  }

  async closeWithButton() {
    await this.closeButton.click();
  }

  async closeWithX() {
    await this.closeXButton.click();
  }
}