import assert from "node:assert/strict";
import test from "node:test";

import {
	renderConfirmationEmail,
	renderNotificationEmail,
} from "../src/services/contact-email.templates.js";
import type { ContactSubmission } from "../src/services/contact.types.js";

const submission: ContactSubmission = {
	name: "<script>alert('name')</script>",
	email: "safe@example.com",
	subject: "A <strong>subject</strong>",
	message: "Hello\n<img src=x onerror=alert(1)>",
	locale: "en",
	turnstileToken: "token",
	submissionId: "7c38e7a5-2eb3-4f5b-9e47-9d2dc26c57a0",
};

test("email templates HTML-escape visitor-controlled content", () => {
	const notification = renderNotificationEmail(submission);
	const confirmation = renderConfirmationEmail(submission);

	assert.doesNotMatch(notification.html, /<script>|<strong>subject|<img /);
	assert.doesNotMatch(confirmation.html, /<script>|<strong>subject/);
	assert.match(notification.html, /&lt;script&gt;/);
	assert.match(notification.html, /&lt;img src=x onerror=alert\(1\)&gt;/);
});

test("confirmation copy follows the selected locale", () => {
	const english = renderConfirmationEmail(submission);
	const french = renderConfirmationEmail({ ...submission, locale: "fr" });

	assert.equal(english.subject, "I received your message");
	assert.equal(french.subject, "J’ai bien reçu votre message");
});
