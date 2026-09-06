import type { FastifyReply, FastifyRequest } from "fastify";

export const getHealth = async (
	_request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	await reply.code(200).send({ status: "ok" });
};
