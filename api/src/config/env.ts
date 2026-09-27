const DEFAULT_PORT = 4000;
const nodeEnv = process.env.NODE_ENV ?? "development";
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";

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

const requiredInProduction = (name: string): string | undefined => {
	const value = process.env[name]?.trim();

	if (!value) {
		if (nodeEnv === "production") {
			throw new Error(`${name} must be set in production.`);
		}

		return undefined;
	}

	return value;
};

const domain = requiredInProduction("DOMAIN")?.toLowerCase();
const defaultProductionHostnames = domain
	? [domain, `www.${domain}`, `v2.${domain}`]
	: [];
const turnstileSecretKey =
	requiredInProduction("TURNSTILE_SECRET_KEY") ?? TURNSTILE_TEST_SECRET;
const contactEmail = "contact@marinbecker.me";

if (nodeEnv === "production" && turnstileSecretKey === TURNSTILE_TEST_SECRET) {
	throw new Error("Cloudflare's Turnstile test secret cannot be used in production.");
}

export const env = Object.freeze({
	nodeEnv,
	host: process.env.HOST ?? (nodeEnv === "production" ? "0.0.0.0" : "127.0.0.1"),
	port: parsePort(process.env.PORT),
	domain,
	resendApiKey: requiredInProduction("RESEND_API_KEY"),
	contactFromEmail: contactEmail,
	contactToEmail: contactEmail,
	turnstileSecretKey,
	turnstileAllowedHostnames:
		nodeEnv === "production" ? defaultProductionHostnames : [],
});
