import { expect, test } from "./fixtures/index.js";

test.describe('About us', () => {

  test('can open about us modal', async ({ navbar, aboutModal }) => {
    await navbar.aboutLink.click();
    await expect(aboutModal.videoPoster).toBeVisible();
  });

  test('title is visible', async ({ navbar, aboutModal }) => {
    await navbar.aboutLink.click();
    await expect(aboutModal.heading).toBeVisible();
  });

  test('play and pause video', async ({ navbar, aboutModal }) => {
    await navbar.aboutLink.click();
    await aboutModal.playButton.click();
    await aboutModal.pauseButton.click();
  });

  test('full screen video', async ({ navbar, aboutModal }) => {
    await navbar.aboutLink.click();
    await aboutModal.playButton.click();
    await aboutModal.fullscreenButton.click();
  });

  test('video is playing', async ({ navbar, aboutModal }) => {
    await navbar.aboutLink.click();
    await aboutModal.playButton.click();
    const videoIsPlaying = await aboutModal.isVideoPlaying();
    expect(videoIsPlaying).toBe(true);
  });

  test('close modal with close button', async ({ navbar, aboutModal }) => {
   await navbar.aboutLink.click();
    await aboutModal.closeButton.click();
    await expect(aboutModal.closeButton).toBeHidden();
  });

  test('close modal with X button', async ({ navbar, aboutModal }) => {
    await navbar.aboutLink.click();
    await aboutModal.closeXButton.click();
    await expect(aboutModal.closeXButton).toBeHidden();
  });
});