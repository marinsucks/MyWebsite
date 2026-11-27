import { test, expect, type Page } from '@playwright/test';

const control = 'http://127.0.0.1:4174';
const fields = { name: 'Ada Lovelace', email: 'ada@example.com', subject: 'Projet E2E', message: 'Bonjour, ce message ne doit pas se perdre.\nDeuxième ligne.' };

async function fill(page: Page) {
  for (const [name, value] of Object.entries(fields)) await page.locator(`[name="${name}"]`).fill(value);
  await expect(page.locator('button[type=submit]')).toBeEnabled();
}
async function submit(page: Page) {
  const response = page.waitForResponse('**/api/contact');
  await page.locator('button[type=submit]').click();
  return response;
}

test.beforeEach(async ({ page, request }) => {
  await request.post(`${control}/reset`);
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.hostname === '127.0.0.1') return route.continue();
    if (url.href.startsWith('https://challenges.cloudflare.com/turnstile/v0/api.js')) {
      return route.fulfill({ contentType: 'application/javascript', body: `
        const widgets = new Map(); let next = 0;
        window.turnstile = {
          render(element, options) { const id = String(++next); widgets.set(id, options); setTimeout(() => options.callback('e2e-token-' + id), 0); return id; },
          reset(id) { setTimeout(() => widgets.get(id)?.callback('e2e-retry-token-' + id), 0); },
          remove(id) { widgets.delete(id); },
          getResponse() { return 'e2e-token'; }, isExpired() { return false; },
          ready(callback) { callback(); }
        };
        const callback = new URL(document.currentScript.src).searchParams.get('onload');
        window[callback]?.();
      ` });
    }
    // Offline CI must never send email or depend on any third-party network.
    return route.abort();
  });
});

for (const locale of ['fr', 'en']) {
  test(`all public pages render in ${locale} without uncaught browser errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(language => localStorage.setItem('language', language), locale);
    for (const path of ['/', '/work', '/about', '/contact']) {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
    }
    expect(errors).toEqual([]);
  });

  test(`the ${locale} form reaches the API and sends both correctly addressed emails`, async ({ page, request }) => {
    await page.addInitScript(language => localStorage.setItem('language', language), locale);
    await page.goto('/contact');
    await fill(page);
    expect((await submit(page)).status()).toBe(202);
    await expect(page.getByRole('status')).toContainText(locale === 'fr' ? 'Message envoyé.' : 'Message sent.');
    const { messages, attempts } = await (await request.get(`${control}/state`)).json();
    expect(messages).toHaveLength(2);
    expect(messages[0]).toMatchObject({ to: ['contact@marinbecker.me'], reply_to: fields.email, subject: '[Portfolio] Projet E2E' });
    expect(messages[0].text).toContain(fields.message);
    expect(messages[1]).toMatchObject({ to: [fields.email], reply_to: 'contact@marinbecker.me' });
    expect(messages[1].text).toContain(locale === 'fr' ? 'Bonjour Ada' : 'Hi Ada');
    expect(attempts[0].key).toMatch(/^contact\/[0-9a-f-]{36}$/);
    await expect(page.locator('[name=message]')).toHaveValue('');
  });
}

test('an unexpected successful HTTP response does not erase the message', async ({ page }) => {
  await page.goto('/contact');
  await fill(page);
  await page.route('**/api/contact', route => route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
  await page.locator('button[type=submit]').click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByRole('status')).toHaveCount(0);
  await expect(page.locator('[name=message]')).toHaveValue(fields.message);
});

for (const mode of ['unavailable', 'partial', 'empty']) {
  test(`a ${mode} Resend response preserves the message and never displays success`, async ({ page, request }) => {
    await request.post(`${control}/settings`, { data: { mail: mode } });
    await page.goto('/contact');
    await fill(page);
    expect((await submit(page)).status()).toBe(503);
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('status')).toHaveCount(0);
    await expect(page.locator('[name=message]')).toHaveValue(fields.message);
    await request.post(`${control}/settings`, { data: { mail: 'ok' } });
    expect((await submit(page)).status()).toBe(202);
    const { messages, attempts } = await (await request.get(`${control}/state`)).json();
    expect(messages).toHaveLength(2);
    expect(attempts[0].key).toBe(attempts[1].key);
  });
}

for (const scenario of [{ challenge: 'invalid', status: 403 }, { challenge: 'unavailable', status: 503 }, { challenge: 'invalid-secret', status: 503 }]) {
  test(`Turnstile ${scenario.challenge} prevents sending and retains the draft`, async ({ page, request }) => {
    await request.post(`${control}/settings`, { data: scenario });
    await page.goto('/contact');
    await fill(page);
    expect((await submit(page)).status()).toBe(scenario.status);
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.locator('[name=message]')).toHaveValue(fields.message);
    const { messages, attempts } = await (await request.get(`${control}/state`)).json();
    expect(messages).toHaveLength(0);
    expect(attempts).toHaveLength(0);
  });
}

for (const edit of [false, true]) {
  test(`a lost API response can be retried ${edit ? 'with an edited message' : 'without duplicate emails'}`, async ({ page, request }) => {
    await page.goto('/contact');
    await fill(page);
    await page.route('**/api/contact', async route => { await route.fetch(); await route.abort(); }, { times: 1 });
    await page.locator('button[type=submit]').click();
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.locator('[name=message]')).toHaveValue(fields.message);
    if (edit) await page.locator('[name=message]').fill('Message corrigé après coupure réseau.');
    expect((await submit(page)).status()).toBe(202);
    const { messages, attempts } = await (await request.get(`${control}/state`)).json();
    expect(messages).toHaveLength(edit ? 4 : 2);
    expect(attempts[0].key === attempts[1].key).toBe(!edit);
  });
}
