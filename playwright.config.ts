import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const STORAGE_STATE = path.join(__dirname, 'tests/setup/data.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: 'list',
  timeout: 60000,
  use: {
    baseURL: 'https://www.demoblaze.com',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: 'tests/setup/setup.ts',
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },
  ],
});