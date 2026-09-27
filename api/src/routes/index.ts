import type { FastifyInstance } from "fastify";

import { createPostContact } from "../controllers/contact.controller.js";
import { getHealth } from "../controllers/health.controller.js";
import { createContactService } from "../services/contact.service.js";
import type { ContactService } from "../services/contact.types.js";

const contactBodySchema = {
	type: "object",
	additionalProperties: false,
	required: [
		"name",
		"email",
		"subject",
		"message",
		"turnstileToken",
		"submissionId",
	],
	properties: {
		name: { type: "string", minLength: 2, maxLength: 80 },
		email: { type: "string", format: "email", maxLength: 254 },
		subject: { type: "string", minLength: 3, maxLength: 120 },
		message: { type: "string", minLength: 1, maxLength: 5_000 },
		locale: { type: "string", enum: ["en", "fr"] },
		turnstileToken: { type: "string", minLength: 1, maxLength: 2_048 },
		submissionId: {
			type: "string",
			pattern:
				"^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$",
		},
		website: { type: "string", maxLength: 200 },
	},
} as const;

/**
 * Central route registry.
 *
 * Keep every public API route visible here. Controllers contain request
 * handling, while business logic belongs in services.
 */
export const registerRoutes = (
	app: FastifyInstance,
	contactService: ContactService = createContactService(),
): void => {
	app.get("/health", getHealth);
	app.post(
		"/contact",
		{
			config: {
				rateLimit: {
					max: 3,
					timeWindow: "15 minutes",
				},
			},
			schema: { body: contactBodySchema },
		},
		createPostContact(contactService),
	);
};
