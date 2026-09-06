import Fastify, { type FastifyInstance } from "fastify";

import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.js";
import { notFoundHandler } from "./middleware/not-found-handler.js";
import { registerRoutes } from "./routes/index.js";

export const buildApp = (): FastifyInstance => {
	const app = Fastify({
		logger: {
			level: env.nodeEnv === "production" ? "info" : "debug",
		},
	});

	registerRoutes(app);
	app.setNotFoundHandler(notFoundHandler);
	app.setErrorHandler(errorHandler);

	return app;
};
