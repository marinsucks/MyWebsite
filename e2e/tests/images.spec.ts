import { test, expect } from '@playwright/test';

test.use({ deviceScaleFactor: 2 });

test('mobile homepage loads both illustrations within its image budget before scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  // Stay independent of the public site, fonts and provider availability.
  await page.route('**/*', route => {
    return new URL(route.request().url()).hostname === '127.0.0.1'
      ? route.continue()
      : route.abort();
  });
  const imageRequests: string[] = [];
  page.on('request', request => {
    if (/\/assets\/(working|about)-.*\.webp/.test(request.url())) imageRequests.push(request.url());
  });
  await page.goto('/');
  const illustrations = page.locator('main img[aria-hidden=true]');
  await expect(illustrations).toHaveCount(2);
  await expect.poll(() => illustrations.evaluateAll(images => images.every(image => {
    const img = image as HTMLImageElement;
    return img.complete && img.naturalWidth > 0;
  }))).toBe(true);
  const downloads = await page.evaluate(() => performance.getEntriesByType('resource')
    .filter(entry => /\/assets\/(working|about)-.*\.webp/.test(entry.name))
    .map(entry => (entry as PerformanceResourceTiming).encodedBodySize));
  expect(downloads).toHaveLength(2);
  expect(downloads.every(bytes => bytes > 0)).toBe(true);
  expect(downloads.reduce((total, bytes) => total + bytes, 0)).toBeLessThan(260_000);
  // The responsive preload must reuse the image request, not download both sizes.
  expect(imageRequests).toHaveLength(2);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});
