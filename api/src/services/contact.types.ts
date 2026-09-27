export type ContactLocale = "en" | "fr";

export interface ContactSubmission {
	name: string;
	email: string;
	subject: string;
	message: string;
	locale: ContactLocale;
	turnstileToken: string;
	submissionId: string;
}

export interface ContactRequestBody extends Omit<ContactSubmission, "locale"> {
	locale?: ContactLocale;
	website?: string;
}

export interface ContactRequestContext {
	ip: string;
}

export interface ContactService {
	submit(
		submission: ContactSubmission,
		context: ContactRequestContext,
	): Promise<void>;
}
