import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const errorHandler = async (
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
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
			code: isClientError ? "BAD_REQUEST" : "INTERNAL_SERVER_ERROR",
			message: isClientError
				? "The request is invalid."
				: "An unexpected error occurred.",
		},
	});
};
