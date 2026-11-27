import { env } from "../config/env.js";
import {
	InvalidChallengeError,
	InvalidContactPayloadError,
} from "./contact.errors.js";
import { createContactEmailSender, type ContactEmailSender } from "./contact-email.service.js";
import type { ContactService } from "./contact.types.js";
import { createTurnstileVerifier, type TurnstileVerifier } from "./turnstile.service.js";

export const createContactService = (dependencies: {
	turnstile?: TurnstileVerifier;
	emailSender?: ContactEmailSender;
} = {}): ContactService => {
	const turnstile = dependencies.turnstile ?? createTurnstileVerifier({
		secretKey: env.turnstileSecretKey,
		allowedHostnames: env.turnstileAllowedHostnames,
	});
	const emailSender = dependencies.emailSender ?? createContactEmailSender({
		apiKey: env.resendApiKey,
		fromEmail: env.contactFromEmail,
		toEmail: env.contactToEmail,
	});

	return {
		async submit(submission, context) {
			const normalizedSubmission = {
				...submission,
				name: submission.name.trim().replace(/\s+/g, " "),
				email: submission.email.trim().toLowerCase(),
				subject: submission.subject.trim().replace(/[\r\n]+/g, " "),
				message: submission.message.trim(),
			};

			if (
				normalizedSubmission.name.length < 2 ||
				normalizedSubmission.subject.length < 3 ||
				normalizedSubmission.message.length === 0
			) {
				throw new InvalidContactPayloadError();
			}

			const challengeIsValid = await turnstile.verify(
				normalizedSubmission.turnstileToken,
				context.ip,
			);

			if (!challengeIsValid) {
				throw new InvalidChallengeError();
			}

			await emailSender.send(normalizedSubmission);
		},
	};
};
