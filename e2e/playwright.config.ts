import { defineConfig } from '@playwright/test';

const live = process.env.LIVE_PROVIDERS === '1';

export default defineConfig({
  testDir: './tests',
  workers: 1,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: live ? 120_000 : 30_000,
  expect: { timeout: 10_000 },
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    browserName: 'chromium',
    // Live traces could include provider credentials/tokens. Keep them local only.
    trace: live ? 'off' : 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: live
    ? [{ name: 'live', testMatch: '**/live.spec.ts' }]
    : [{ name: 'offline', testMatch: '**/contact.spec.ts' }],
  webServer: [
    {
      command: 'node server.mjs',
      url: 'http://127.0.0.1:4174/health',
      reuseExistingServer: false,
      timeout: 30_000,
    },
    {
      command: 'npm exec -- vite preview --host 127.0.0.1 --port 4173 --strictPort',
      cwd: '../frontend',
      url: 'http://127.0.0.1:4173/contact',
      env: { API_PROXY_TARGET: 'http://127.0.0.1:4175', NODE_ENV: 'production' },
      reuseExistingServer: false,
      timeout: 30_000,
    },
  ],
});
