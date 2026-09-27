import assert from "node:assert/strict";
import test from "node:test";

import { createTurnstileVerifier } from "../src/services/turnstile.service.js";

const jsonResponse = (body: object): Response =>
	new Response(JSON.stringify(body), {
		status: 200,
		headers: { "content-type": "application/json" },
	});

test("Turnstile verification requires the contact action and an allowed hostname", async () => {
	const createVerifier = (action: string, hostname: string) =>
		createTurnstileVerifier({
			secretKey: "production-secret",
			allowedHostnames: ["marinbecker.me"],
			fetchImplementation: async () =>
				jsonResponse({ success: true, action, hostname }),
		});

	assert.equal(
		await createVerifier("contact", "marinbecker.me").verify("token", "127.0.0.1"),
		true,
	);
	assert.equal(
		await createVerifier("login", "marinbecker.me").verify("token", "127.0.0.1"),
		false,
	);
	assert.equal(
		await createVerifier("contact", "attacker.example").verify("token", "127.0.0.1"),
		false,
	);
});

test("Turnstile sends the token, secret and remote IP to Siteverify", async () => {
	let requestBody: URLSearchParams | undefined;
	const verifier = createTurnstileVerifier({
		secretKey: "production-secret",
		allowedHostnames: ["marinbecker.me"],
		fetchImplementation: async (_input, init) => {
			requestBody = init?.body as URLSearchParams;
			return jsonResponse({
				success: true,
				action: "contact",
				hostname: "marinbecker.me",
			});
		},
	});

	await verifier.verify("visitor-token", "203.0.113.42");

	assert.equal(requestBody?.get("secret"), "production-secret");
	assert.equal(requestBody?.get("response"), "visitor-token");
	assert.equal(requestBody?.get("remoteip"), "203.0.113.42");
});
