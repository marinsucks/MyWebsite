import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";

import {
	ContactServiceUnavailableError,
	InvalidChallengeError,
	InvalidContactPayloadError,
} from "../services/contact.errors.js";

export const errorHandler = async (
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	if (error instanceof InvalidContactPayloadError) {
		await reply.code(400).send({
			error: {
				code: "BAD_REQUEST",
				message: "The request is invalid.",
			},
		});
		return;
	}

	if (error instanceof InvalidChallengeError) {
		await reply.code(403).send({
			error: {
				code: "CHALLENGE_FAILED",
				message: "The anti-bot challenge is invalid or expired.",
			},
		});
		return;
	}

	if (error instanceof ContactServiceUnavailableError) {
		request.log.error({ error }, "Contact service unavailable");
		await reply.code(503).send({
			error: {
				code: "CONTACT_UNAVAILABLE",
				message: "The contact service is temporarily unavailable.",
			},
		});
		return;
	}

	const isClientError =
		error.statusCode !== undefined &&
		error.statusCode >= 400 &&
		error.statusCode < 500;
	const statusCode = isClientError ? error.statusCode ?? 400 : 500;

	if (!isClientError) {
		request.log.error({ error }, "Unhandled API error");
	}

	await reply.code(statusCode).send({
		error: {
			code:
				statusCode === 429
					? "RATE_LIMITED"
					: isClientError
						? "BAD_REQUEST"
						: "INTERNAL_SERVER_ERROR",
			message: isClientError
				? "The request is invalid."
				: "An unexpected error occurred.",
		},
	});
};
