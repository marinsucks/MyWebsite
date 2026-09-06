import { buildApp } from "./app.js";
import { env } from "./config/env.js";

const app = buildApp();

const shutdown = async (signal: NodeJS.Signals): Promise<void> => {
	app.log.info({ signal }, "Shutting down API");
	await app.close();
};

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));

try {
	await app.listen({ host: env.host, port: env.port });
} catch (error) {
	app.log.fatal({ error }, "Unable to start API");
	process.exitCode = 1;
}
