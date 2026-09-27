import type { FastifyReply, FastifyRequest } from "fastify";

import type {
	ContactRequestBody,
	ContactService,
} from "../services/contact.types.js";

type ContactRequest = FastifyRequest<{ Body: ContactRequestBody }>;

export const createPostContact =
	(contactService: ContactService) =>
	async (request: ContactRequest, reply: FastifyReply): Promise<void> => {
		const { website = "", locale = "en", ...submission } = request.body;

		// Silently accept honeypot submissions so bots cannot tune around it.
		if (website.trim() !== "") {
			await reply.code(202).send({ status: "accepted" });
			return;
		}

		await contactService.submit({ ...submission, locale }, { ip: request.ip });
		await reply.code(202).send({ status: "accepted" });
	};
