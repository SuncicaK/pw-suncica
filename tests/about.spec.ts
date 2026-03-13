import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

async function openContactModal(page: Page) {
  await page.getByRole('link', { name: 'About us' }).click();
}

test.describe('About us', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('can open about us modal', async ({ page }) => {
    await page.getByRole('link', { name: 'About us' }).click();

    await expect(page.locator('.vjs-poster')).toBeVisible();
  });

  test('title is visible', async ({ page }) => {
    await openContactModal(page);
    await expect(page.getByRole('heading', { name: 'About us', exact: true })).toBeVisible();
  });

  test('play and pause video', async ({ page }) => {
    await openContactModal(page);

    await page.getByRole('button', { name: 'Play Video' }).click();
    await page.getByRole('button', { name: 'Pause' }).click();
  });

  test('full screen video', async ({ page }) => {
    await openContactModal(page);

    await page.getByRole('button', { name: 'Play Video' }).click();
    await page.getByRole('button', { name: 'Fullscreen' }).click();
  });

  test('video is playing', async ({ page }) => {
    await openContactModal(page);
    await page.getByRole('button', { name: 'Play Video' }).click();

    const videoIsPlaying = await page
      .locator('#example-video_html5_api')
      .evaluate((v: HTMLVideoElement) => !v.paused);
    expect(videoIsPlaying).toBe(true);
  });

  test('close modal with close button', async ({ page }) => {
    await openContactModal(page);

    await page.locator('#videoModal').getByText('Close', { exact: true }).click();
    await expect(page.locator('#exampleModal')).toBeHidden();
  });

  test('close modal with X button', async ({ page }) => {
    await openContactModal(page);

    await page.locator('#videoModal').getByLabel('Close').click();
    await expect(page.locator('#exampleModal')).toBeHidden();
  });
});
