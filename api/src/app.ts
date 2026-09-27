import Fastify, { type FastifyInstance } from "fastify";
import rateLimit from "@fastify/rate-limit";

import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.js";
import { notFoundHandler } from "./middleware/not-found-handler.js";
import { registerRoutes } from "./routes/index.js";
import type { ContactService } from "./services/contact.types.js";

interface AppDependencies {
	contactService?: ContactService;
}

export const buildApp = async (
	{ contactService }: AppDependencies = {},
): Promise<FastifyInstance> => {
	const app = Fastify({
		bodyLimit: 16 * 1_024,
		trustProxy: true,
		logger: {
			level: env.nodeEnv === "production" ? "info" : "debug",
		},
	});

	await app.register(rateLimit, { global: false });
	registerRoutes(app, contactService);
	app.setNotFoundHandler(notFoundHandler);
	app.setErrorHandler(errorHandler);

	return app;
};
