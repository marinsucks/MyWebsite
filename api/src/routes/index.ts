import type { FastifyInstance } from "fastify";

import { getHealth } from "../controllers/health.controller.js";

/**
 * Central route registry.
 *
 * Keep every public API route visible here. Controllers contain request
 * handling, while business logic belongs in services.
 */
export const registerRoutes = (app: FastifyInstance): void => {
	app.get("/health", getHealth);
};
