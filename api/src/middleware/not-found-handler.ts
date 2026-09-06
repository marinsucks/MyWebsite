import type { FastifyReply, FastifyRequest } from "fastify";

export const notFoundHandler = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	await reply.code(404).send({
		error: {
			code: "NOT_FOUND",
			message: `Route ${request.method} ${request.url} was not found.`,
		},
	});
};
