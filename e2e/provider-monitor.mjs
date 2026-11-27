// No message bodies or recipient addresses are logged by the monitor.
export async function resendGet(path, { apiKey, fetchImplementation = fetch } = {}) {
  if (!apiKey) throw new Error('Missing Resend monitoring key');
  const response = await fetchImplementation(`https://api.resend.com${path}`, {
    headers: { authorization: `Bearer ${apiKey}` }, signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    throw new Error(`Resend monitoring returned HTTP ${response.status}; the monitoring key needs permission to read sent emails`);
  }
  return response.json();
}

export function deliveryProblems(emails, { domain, now = Date.now() }) {
  const failures = [];
  for (const email of emails) {
    if (email.from !== `contact@${domain}` && !email.from?.endsWith(`<contact@${domain}>`)) continue;
    const created = Date.parse(email.created_at.replace(' ', 'T').replace(/\+00$/, 'Z'));
    if (!Number.isFinite(created)) throw new Error('Resend returned an invalid creation timestamp');
    if (now - created > 24 * 60 * 60_000) continue;
    const event = email.last_event;
    if (['bounced', 'failed', 'suppressed', 'complained', 'delivery_delayed'].includes(event) ||
        (!['delivered', 'opened', 'clicked'].includes(event) && now - created > 30 * 60_000)) {
      failures.push({ event: event || 'missing delivery status' });
    }
  }
  return failures;
}

export async function checkRecentDeliveries(options) {
  let after = '';
  const failures = [];
  for (let page = 0; page < 10; page++) {
    const result = await resendGet(`/emails?limit=100${after ? `&after=${encodeURIComponent(after)}` : ''}`, options);
    if (!Array.isArray(result.data)) throw new Error('Resend returned an invalid email list');
    failures.push(...deliveryProblems(result.data, options));
    const oldest = result.data.at(-1);
    const cutoffReached = oldest && Date.parse(oldest.created_at.replace(' ', 'T').replace(/\+00$/, 'Z')) < Date.now() - 24 * 60 * 60_000;
    if (!result.has_more || cutoffReached) {
      if (failures.length) {
        const counts = {};
        for (const { event } of failures) counts[event] = (counts[event] ?? 0) + 1;
        throw new Error(`Contact email delivery problems in the last 24 hours: ${JSON.stringify(counts)}. Inspect the Resend dashboard.`);
      }
      return;
    }
    if (!oldest?.id) throw new Error('Resend pagination did not provide a cursor');
    after = oldest.id;
    await new Promise(resolve => setTimeout(resolve, 600));
  }
  throw new Error('Delivery monitoring exceeded 1,000 recent emails; increase its pagination limit');
}
