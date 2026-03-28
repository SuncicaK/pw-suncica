import { expect, test } from "./fixtures/index.js";


test.describe('About us', () => {
  test.beforeEach(async ({ aboutModal }) => {
    await aboutModal.openModal();
  });

  test('can open about us modal', async ({ aboutModal }) => {
    await expect(aboutModal.videoPoster).toBeVisible();
  });

  test('title is visible', async ({ aboutModal }) => {
    await expect(aboutModal.heading).toBeVisible();
  });

  test('play and pause video', async ({ aboutModal }) => {
    await aboutModal.play();
    await aboutModal.pause();
  });

  test('full screen video', async ({ aboutModal }) => {
    await aboutModal.play();
    await aboutModal.fullscreen();
  });

  test('video is playing', async ({ aboutModal }) => {
    await aboutModal.play();
    const isPlaying = await aboutModal.isVideoPlaying();
    expect(isPlaying).toBe(true);
  });

  test('close modal with close button', async ({ aboutModal }) => {
    await aboutModal.closeWithButton();
    await expect(aboutModal.videoPoster).toBeHidden();
  });

  test('close modal with X button', async ({ aboutModal }) => {
    await aboutModal.closeWithX();
    await expect(aboutModal.videoPoster).toBeHidden();
  });
});