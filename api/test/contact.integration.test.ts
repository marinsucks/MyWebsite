import assert from 'node:assert/strict';
import test from 'node:test';
import { buildApp } from '../src/app.js';
import { createContactService } from '../src/services/contact.service.js';
import { createContactEmailSender } from '../src/services/contact-email.service.js';
import { createTurnstileVerifier } from '../src/services/turnstile.service.js';

const payload = {
  name: '  Ada   Lovelace  ', email: 'Ada@example.com', subject: '  Projet  ',
  message: ' Bonjour ! ', locale: 'fr', turnstileToken: 'token',
  submissionId: '7c38e7a5-2eb3-4f5b-9e47-9d2dc26c57a0',
};

for (const scenario of [
  { name: 'a complete provider acceptance', data: { data: [{ id: 'notification' }, { id: 'confirmation' }] }, status: 202 },
  { name: 'an empty provider acceptance', data: {}, status: 503 },
  { name: 'a partial provider acceptance', data: { data: [{ id: 'notification' }] }, status: 503 },
  { name: 'duplicate provider receipt IDs', data: { data: [{ id: 'same' }, { id: 'same' }] }, status: 503 },
  { name: 'a provider error', data: { name: 'application_error' }, providerStatus: 503, status: 503 },
] as const) {
  test(`the real contact service handles ${scenario.name}`, async t => {
    let sent: Record<string, unknown>[] = [];
    let key: string | null = null;
    t.mock.method(globalThis, 'fetch', async (url: string, options: RequestInit) => {
      assert.equal(url, 'https://api.resend.com/emails/batch');
      assert.ok(options.signal instanceof AbortSignal);
      key = new Headers(options.headers).get('idempotency-key');
      sent = JSON.parse(options.body as string);
      return Response.json(scenario.data, { status: 'providerStatus' in scenario ? scenario.providerStatus : 200 });
    });
    const app = await buildApp({ contactService: createContactService({
      emailSender: createContactEmailSender({ apiKey: 're_test', fromEmail: 'contact@example.com', toEmail: 'owner@example.com' }),
      turnstile: createTurnstileVerifier({ secretKey: 'test', allowedHostnames: ['example.com'],
        fetchImplementation: async () => Response.json({ success: true, hostname: 'example.com', action: 'contact' }) }),
    }) });
    t.after(() => app.close());
    const response = await app.inject({ method: 'POST', url: '/contact', payload });
    assert.equal(response.statusCode, scenario.status);
    assert.equal(key, `contact/${payload.submissionId}`);
    assert.equal(sent.length, 2);
    assert.deepEqual(sent[0]?.to, ['owner@example.com']);
    assert.equal(sent[0]?.reply_to, 'ada@example.com');
    assert.match(sent[0]?.text as string, /Ada Lovelace/);
    assert.deepEqual(sent[1]?.to, ['ada@example.com']);
  });
}

for (const code of ['invalid-input-secret', 'missing-input-secret', 'internal-error', 'bad-request']) {
  test(`a Turnstile ${code} is a service failure, not a rejected visitor`, async t => {
    const app = await buildApp({ contactService: createContactService({
      turnstile: createTurnstileVerifier({ secretKey: 'test', allowedHostnames: [],
        fetchImplementation: async () => Response.json({ success: false, 'error-codes': [code] }) }),
      emailSender: { async send() { assert.fail('Must not send after a provider failure'); } },
    }) });
    t.after(() => app.close());
    const response = await app.inject({ method: 'POST', url: '/contact', payload });
    assert.equal(response.statusCode, 503);
    assert.equal(response.json().error.code, 'CONTACT_UNAVAILABLE');
  });
}
