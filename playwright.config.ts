import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'src/test/a11y-axecore',
  testMatch: /.*\.spec\.ts$/,
  use: {
    headless: true,
    baseURL: 'http://localhost:3100', // adjust if needed
  },
  reporter: [['list'], ['html', { open: 'never' }]],
});

