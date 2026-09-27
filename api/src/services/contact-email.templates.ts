import type {
	ContactLocale,
	ContactSubmission,
} from "./contact.types.js";

export interface RenderedEmail {
	subject: string;
	text: string;
	html: string;
}

const escapeHtml = (value: string): string =>
	value.replace(
		/[&<>'"]/g,
		(character) =>
			({
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				"'": "&#39;",
				'"': "&quot;",
			})[character] ?? character,
	);

const formatMessageHtml = (value: string): string =>
	escapeHtml(value).replace(/\r?\n/g, "<br>");

const shell = (content: string, language: ContactLocale): string => `<!doctype html>
<html lang="${language}">
<body style="margin:0;background:#f3f6fa;color:#172033;font-family:Arial,sans-serif">
  <div style="max-width:620px;margin:0 auto;padding:40px 20px">
    <div style="background:#fff;border:1px solid #dce4ee;border-radius:12px;padding:32px">
      ${content}
    </div>
    <p style="margin:18px 0 0;color:#637083;font-size:12px;text-align:center">marinbecker.me</p>
  </div>
</body>
</html>`;

export const renderNotificationEmail = (
	submission: ContactSubmission,
): RenderedEmail => {
	const safeName = escapeHtml(submission.name);
	const safeEmail = escapeHtml(submission.email);
	const safeSubject = escapeHtml(submission.subject);

	return {
		subject: `[Portfolio] ${submission.subject}`,
		text: [
			`New message from ${submission.name}`,
			`Email: ${submission.email}`,
			`Language: ${submission.locale}`,
			`Subject: ${submission.subject}`,
			"",
			submission.message,
		].join("\n"),
		html: shell(
			`<h1 style="margin:0 0 24px;font-size:24px">New portfolio message</h1>
      <p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
      <p><strong>Language:</strong> ${submission.locale}</p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <div style="margin-top:24px;padding:20px;background:#f7f9fc;border-radius:8px;line-height:1.6">${formatMessageHtml(submission.message)}</div>`,
			"en",
		),
	};
};

export const renderConfirmationEmail = (
	submission: ContactSubmission,
): RenderedEmail => {
	const safeName = escapeHtml(submission.name);
	const safeSubject = escapeHtml(submission.subject);

	if (submission.locale === "fr") {
		return {
			subject: "J’ai bien reçu votre message",
			text: `Bonjour ${submission.name},\n\nMerci de m’avoir contacté. J’ai bien reçu votre message « ${submission.subject} » et je vous répondrai dès que possible.\n\nÀ bientôt,\nMarin`,
			html: shell(
				`<h1 style="margin:0 0 24px;font-size:24px">Message bien reçu.</h1>
        <p style="line-height:1.6">Bonjour ${safeName},</p>
        <p style="line-height:1.6">Merci de m’avoir contacté. J’ai bien reçu votre message « ${safeSubject} » et je vous répondrai dès que possible.</p>
        <p style="margin-top:28px;line-height:1.6">À bientôt,<br><strong>Marin</strong></p>`,
				"fr",
			),
		};
	}

	return {
		subject: "I received your message",
		text: `Hi ${submission.name},\n\nThanks for reaching out. I received your message “${submission.subject}” and will get back to you as soon as I can.\n\nTalk soon,\nMarin`,
		html: shell(
			`<h1 style="margin:0 0 24px;font-size:24px">Message received.</h1>
      <p style="line-height:1.6">Hi ${safeName},</p>
      <p style="line-height:1.6">Thanks for reaching out. I received your message “${safeSubject}” and will get back to you as soon as I can.</p>
      <p style="margin-top:28px;line-height:1.6">Talk soon,<br><strong>Marin</strong></p>`,
			"en",
		),
	};
};
