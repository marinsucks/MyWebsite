// Test harness only: never shipped in the API image and never mounts test routes
// in production. Offline runs allow outbound requests only to these local fakes.
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';

const live = process.env.LIVE_PROVIDERS === '1';
const liveKey = process.env.RESEND_API_KEY;
if (live && !liveKey) throw new Error('RESEND_API_KEY is required for live monitoring');
Object.assign(process.env, {
  NODE_ENV: 'test',
  DOMAIN: 'example.com',
  RESEND_API_KEY: live ? liveKey : 're_local_e2e',
  TURNSTILE_SECRET_KEY: live ? '1x0000000000000000000000000000000AA' : 'e2e-secret',
});
delete process.env.RESEND_BASE_URL;

let settings;
let messages;
let attempts;
let receipts;
let accepted;
let app;
const realFetch = globalThis.fetch;
if (!live) {
  globalThis.fetch = (input, options) => {
    const url = String(input);
    if (url === 'https://api.resend.com/emails/batch') {
      return realFetch('http://127.0.0.1:4174/emails/batch', options);
    }
    if (url === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
      return realFetch('http://127.0.0.1:4174/siteverify', options);
    }
    throw new Error(`Unexpected outbound request in offline E2E: ${new URL(url).origin}`);
  };
}

const { buildApp } = await import('../api/dist/app.js');
const { createContactService } = await import('../api/dist/services/contact.service.js');
const { createContactEmailSender } = await import('../api/dist/services/contact-email.service.js');

async function reset() {
  if (app) await app.close();
  settings = { mail: 'ok', challenge: 'ok' };
  messages = [];
  attempts = [];
  receipts = [];
  accepted = new Map();
  const sender = createContactEmailSender({
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: live ? `contact@${process.env.MONITOR_DOMAIN}` : 'contact@marinbecker.me',
    toEmail: live ? 'delivered+portfolio-monitor-owner@resend.dev' : 'contact@marinbecker.me',
  });
  app = await buildApp({ contactService: createContactService({ emailSender: {
    async send(submission) {
      // A misconfigured live test must never send to a real visitor's mailbox.
      if (live && submission.email !== 'delivered+portfolio-monitor-visitor@resend.dev') {
        throw new Error('Live monitoring only permits the Resend test recipient');
      }
      const receipt = await sender.send(submission);
      receipts.push(receipt);
      return receipt;
    },
  } }) });
  await app.listen({ host: '127.0.0.1', port: 4175 });
}

const server = createServer(async (req, res) => {
  const json = (status, value) => {
    res.writeHead(status, { 'content-type': 'application/json' });
    res.end(JSON.stringify(value));
  };
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString();
    if (req.url === '/health') return json(200, { status: 'ok' });
    if (req.url === '/reset' && req.method === 'POST') {
      await reset();
      return json(200, { status: 'ok' });
    }
    if (req.url === '/settings' && req.method === 'POST' && !live) {
      Object.assign(settings, JSON.parse(raw));
      return json(200, settings);
    }
    if (req.url === '/state') return json(200, { messages, attempts, receipts });
    if (req.url === '/siteverify' && !live) {
      if (settings.challenge === 'unavailable') return json(503, { error: 'unavailable' });
      if (settings.challenge === 'invalid-secret') return json(200, { success: false, 'error-codes': ['invalid-input-secret'] });
      return json(200, {
        success: settings.challenge === 'ok', hostname: 'example.com', action: 'contact',
        'error-codes': settings.challenge === 'ok' ? [] : ['invalid-input-response'],
      });
    }
    if (req.url === '/emails/batch' && !live) {
      const payload = JSON.parse(raw);
      const key = req.headers['idempotency-key'];
      attempts.push({ key, messages: payload });
      if (!key || req.headers.authorization !== 'Bearer re_local_e2e') return json(401, { name: 'validation_error' });
      if (settings.mail === 'unavailable') return json(503, { name: 'application_error', message: 'Provider unavailable' });
      if (settings.mail === 'partial') return json(200, { data: [{ id: randomUUID() }] });
      if (settings.mail === 'empty') return json(200, {});
      if (accepted.has(key)) {
        const previous = accepted.get(key);
        if (previous.raw !== raw) return json(409, { name: 'invalid_idempotent_request', message: 'Changed payload' });
        return json(200, previous.result);
      }
      const result = { data: payload.map(() => ({ id: randomUUID() })) };
      messages.push(...payload);
      accepted.set(key, { raw, result });
      return json(200, result);
    }
    return json(404, { error: 'not found' });
  } catch {
    return json(500, { error: 'test harness failed' });
  }
});
await reset();
server.listen(4174, '127.0.0.1');
async function close() {
  await app.close();
  server.close();
}
process.once('SIGTERM', close);
process.once('SIGINT', close);
