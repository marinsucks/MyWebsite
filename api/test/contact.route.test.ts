import assert from "node:assert/strict";
import test from "node:test";

import { buildApp } from "../src/app.js";
import {
	ContactServiceUnavailableError,
	InvalidChallengeError,
} from "../src/services/contact.errors.js";
import type {
	ContactService,
	ContactSubmission,
} from "../src/services/contact.types.js";

const validPayload = {
	name: "Ada Lovelace",
	email: "ada@example.com",
	subject: "A portfolio project",
	message: "I would like to discuss a project with you.",
	locale: "en",
	turnstileToken: "valid-token",
	submissionId: "7c38e7a5-2eb3-4f5b-9e47-9d2dc26c57a0",
} as const;

test("POST /contact accepts a valid submission", async (t) => {
	let received: ContactSubmission | undefined;
	let receivedIp: string | undefined;
	const contactService: ContactService = {
		async submit(submission, context) {
			received = submission;
			receivedIp = context.ip;
		},
	};
	const app = await buildApp({ contactService });
	t.after(() => app.close());

	const response = await app.inject({
		method: "POST",
		url: "/contact",
		headers: { "x-forwarded-for": "203.0.113.10" },
		payload: validPayload,
	});

	assert.equal(response.statusCode, 202);
	assert.deepEqual(response.json(), { status: "accepted" });
	assert.deepEqual(received, validPayload);
	assert.equal(receivedIp, "203.0.113.10");
});

test("POST /contact rejects an invalid payload before the service", async (t) => {
	let calls = 0;
	const app = await buildApp({
		contactService: {
			async submit() {
				calls += 1;
			},
		},
	});
	t.after(() => app.close());

	const response = await app.inject({
		method: "POST",
		url: "/contact",
		payload: { ...validPayload, message: "too short" },
	});

	assert.equal(response.statusCode, 400);
	assert.equal(calls, 0);
});

test("POST /contact defaults to English when locale is omitted", async (t) => {
	let receivedLocale: string | undefined;
	const app = await buildApp({
		contactService: {
			async submit(submission) {
				receivedLocale = submission.locale;
			},
		},
	});
	t.after(() => app.close());
	const { locale: _locale, ...payloadWithoutLocale } = validPayload;

	const response = await app.inject({
		method: "POST",
		url: "/contact",
		payload: payloadWithoutLocale,
	});

	assert.equal(response.statusCode, 202);
	assert.equal(receivedLocale, "en");
});

test("POST /contact silently accepts a filled honeypot", async (t) => {
	let calls = 0;
	const app = await buildApp({
		contactService: {
			async submit() {
				calls += 1;
			},
		},
	});
	t.after(() => app.close());

	const response = await app.inject({
		method: "POST",
		url: "/contact",
		payload: { ...validPayload, website: "https://spam.example" },
	});

	assert.equal(response.statusCode, 202);
	assert.equal(calls, 0);
});

test("POST /contact rate-limits the fourth submission from one IP", async (t) => {
	const app = await buildApp({
		contactService: { async submit() {} },
	});
	t.after(() => app.close());

	for (let attempt = 1; attempt <= 3; attempt += 1) {
		const response = await app.inject({
			method: "POST",
			url: "/contact",
			headers: { "x-forwarded-for": "203.0.113.20" },
			payload: { ...validPayload, submissionId: crypto.randomUUID() },
		});
		assert.equal(response.statusCode, 202);
	}

	const blockedResponse = await app.inject({
		method: "POST",
		url: "/contact",
		headers: { "x-forwarded-for": "203.0.113.20" },
		payload: { ...validPayload, submissionId: crypto.randomUUID() },
	});

	assert.equal(blockedResponse.statusCode, 429);
	assert.equal(blockedResponse.json().error.code, "RATE_LIMITED");
});

for (const scenario of [
	{
		name: "maps a failed challenge to 403",
		error: new InvalidChallengeError(),
		statusCode: 403,
		code: "CHALLENGE_FAILED",
	},
	{
		name: "maps an unavailable provider to 503",
		error: new ContactServiceUnavailableError("provider failed"),
		statusCode: 503,
		code: "CONTACT_UNAVAILABLE",
	},
] as const) {
	test(`POST /contact ${scenario.name}`, async (t) => {
		const app = await buildApp({
			contactService: {
				async submit() {
					throw scenario.error;
				},
			},
		});
		t.after(() => app.close());

		const response = await app.inject({
			method: "POST",
			url: "/contact",
			payload: validPayload,
		});

		assert.equal(response.statusCode, scenario.statusCode);
		assert.equal(response.json().error.code, scenario.code);
	});
}
