import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalTimeout: 60 * 60 * 1000,

  testDir: './tests',

  fullyParallel: true,
 
  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : 2,

  reporter: 'html',
 
  use: {

    baseURL: 'https://dev.rentzila.com.ua/',

 
    trace: 'on-first-retry',
  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        viewport: {width: 1920, height: 1080}
       },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
