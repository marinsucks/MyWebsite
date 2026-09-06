const DEFAULT_PORT = 4000;
const nodeEnv = process.env.NODE_ENV ?? "development";

const parsePort = (value: string | undefined): number => {
	if (value === undefined) {
		return DEFAULT_PORT;
	}

	const port = Number(value);

	if (!Number.isInteger(port) || port < 1 || port > 65_535) {
		throw new Error("PORT must be an integer between 1 and 65535.");
	}

	return port;
};

export const env = Object.freeze({
	nodeEnv,
	host: process.env.HOST ?? (nodeEnv === "production" ? "0.0.0.0" : "127.0.0.1"),
	port: parsePort(process.env.PORT),
});
