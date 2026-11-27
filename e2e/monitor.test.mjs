import assert from 'node:assert/strict';
import test from 'node:test';
import { deliveryProblems, resendGet, checkRecentDeliveries } from './provider-monitor.mjs';
import { reportIncident } from '../scripts/monitor-incident.mjs';

const now = Date.parse('2026-11-27T12:00:00Z');
const email = { id: 'test', from: 'Marin Becker <contact@example.com>', created_at: '2026-11-27 11:00:00.000000+00', last_event: 'delivered' };
const options = { domain: 'example.com', now };

test('delivery alerts distinguish healthy delivery, bounces, delays and old pending messages', () => {
  assert.deepEqual(deliveryProblems([email], options), []);
  for (const event of ['bounced', 'failed', 'suppressed', 'complained', 'delivery_delayed', 'sent']) {
    assert.equal(deliveryProblems([{ ...email, last_event: event }], options).length, 1);
  }
  assert.deepEqual(deliveryProblems([{ ...email, created_at: '2026-11-27T11:59:00Z', last_event: 'sent' }], options), []);
  assert.deepEqual(deliveryProblems([{ ...email, from: 'another@example.com', last_event: 'failed' }], options), []);
  assert.deepEqual(deliveryProblems([{ ...email, created_at: '2026-11-25T12:00:00Z', last_event: 'failed' }], options), []);
});

test('a denied monitoring key fails visibly without leaking provider content or credentials', async () => {
  await assert.rejects(resendGet('/emails', { apiKey: 'do-not-log', fetchImplementation: async () => new Response('sensitive response', { status: 403 }) }),
    { message: 'Resend monitoring returned HTTP 403; the monitoring key needs permission to read sent emails' });
});

test('delivery monitoring checks later pages and does not silently pass an incomplete response', async () => {
  let calls = 0;
  await assert.rejects(checkRecentDeliveries({ ...options, apiKey: 'test', fetchImplementation: async () => {
    calls++;
    return Response.json(calls === 1 ? { data: [{ ...email, created_at: new Date().toISOString() }], has_more: true } :
      { data: [{ ...email, created_at: new Date().toISOString(), last_event: 'bounced' }], has_more: false });
  } }), /delivery problems/);
  assert.equal(calls, 2);
  await assert.rejects(checkRecentDeliveries({ ...options, apiKey: 'test', fetchImplementation: async () => Response.json({}) }), /invalid email list/);
});

test('an outage creates one assigned alert, subsequent failures update it, and recovery closes it', async () => {
  let issues = [];
  const mutations = [];
  const fakeGitHub = async (url, init) => {
    assert.ok(url.startsWith('https://api.github.com/repos/marinsucks/MyWebsite/issues'));
    if (init.method === 'GET') return Response.json(issues);
    const body = JSON.parse(init.body);
    mutations.push({ method: init.method, url, body });
    if (init.method === 'POST' && url.endsWith('/issues')) {
      issues = [{ ...body, number: 42, user: { login: 'github-actions[bot]' } }];
    }
    return Response.json({});
  };
  const environment = { GITHUB_REPOSITORY: 'marinsucks/MyWebsite', GITHUB_RUN_ID: '1', GITHUB_TOKEN: 'test', MONITOR_RESULT: 'failure' };
  await reportIncident(environment, fakeGitHub);
  assert.deepEqual(mutations[0].body.assignees, ['marinsucks']);
  await reportIncident(environment, fakeGitHub);
  assert.equal(mutations.length, 2);
  assert.equal(mutations[1].method, 'PATCH');
  await reportIncident({ ...environment, MONITOR_RESULT: 'success' }, fakeGitHub);
  assert.ok(mutations[2].url.endsWith('/42/comments'));
  assert.equal(mutations[3].body.state, 'closed');
});

test('GitHub notification failure is visible instead of silently losing the alert', async () => {
  await assert.rejects(reportIncident({ GITHUB_REPOSITORY: 'marinsucks/MyWebsite', MONITOR_RESULT: 'failure' },
    async () => new Response('', { status: 403 })), /notification failed: HTTP 403/);
});
