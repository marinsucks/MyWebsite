import { Resend } from "resend";

import { ContactServiceUnavailableError } from "./contact.errors.js";
import {
	renderConfirmationEmail,
	renderNotificationEmail,
} from "./contact-email.templates.js";
import type { ContactSubmission } from "./contact.types.js";

export interface ContactEmailSender {
	send(submission: ContactSubmission): Promise<void>;
}

interface ContactEmailSenderOptions {
	apiKey: string | undefined;
	fromEmail: string;
	toEmail: string;
}

export const createContactEmailSender = ({
	apiKey,
	fromEmail,
	toEmail,
}: ContactEmailSenderOptions): ContactEmailSender => {
	const resend = apiKey ? new Resend(apiKey) : undefined;
	const from = `Marin Becker <${fromEmail}>`;

	return {
		async send(submission) {
			if (!resend) {
				throw new ContactServiceUnavailableError(
					"RESEND_API_KEY is not configured.",
				);
			}

			try {
				const notification = renderNotificationEmail(submission);
				const confirmation = renderConfirmationEmail(submission);
				const { error } = await resend.batch.send(
					[
						{
							from,
							to: [toEmail],
							replyTo: submission.email,
							subject: notification.subject,
							text: notification.text,
							html: notification.html,
						},
						{
							from,
							to: [submission.email],
							replyTo: fromEmail,
							subject: confirmation.subject,
							text: confirmation.text,
							html: confirmation.html,
						},
					],
					{ idempotencyKey: `contact/${submission.submissionId}` },
				);

				if (!error) return;

				throw new ContactServiceUnavailableError(
					"The email provider rejected the contact submission.",
					{ cause: error },
				);
			} catch (error) {
				if (error instanceof ContactServiceUnavailableError) throw error;

				throw new ContactServiceUnavailableError(
					"The email provider is unreachable.",
					{ cause: error },
				);
			}
		},
	};
};
