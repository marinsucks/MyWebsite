import { ContactServiceUnavailableError } from "./contact.errors.js";

const TURNSTILE_VERIFY_URL =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";

interface TurnstileResponse {
	success: boolean;
	hostname?: string;
	action?: string;
	"error-codes"?: string[];
}

export interface TurnstileVerifier {
	verify(token: string, remoteIp: string): Promise<boolean>;
}

interface TurnstileVerifierOptions {
	secretKey: string;
	allowedHostnames: readonly string[];
	fetchImplementation?: typeof fetch;
}

export const createTurnstileVerifier = ({
	secretKey,
	allowedHostnames,
	fetchImplementation = fetch,
}: TurnstileVerifierOptions): TurnstileVerifier => ({
	async verify(token, remoteIp) {
		const body = new URLSearchParams({
			secret: secretKey,
			response: token,
			remoteip: remoteIp,
		});

		let response: Response;

		try {
			response = await fetchImplementation(TURNSTILE_VERIFY_URL, {
				method: "POST",
				headers: { "content-type": "application/x-www-form-urlencoded" },
				body,
				signal: AbortSignal.timeout(5_000),
			});
		} catch (error) {
			throw new ContactServiceUnavailableError(
				"Turnstile verification is unavailable.",
				{ cause: error },
			);
		}

		if (!response.ok) {
			throw new ContactServiceUnavailableError(
				`Turnstile verification returned HTTP ${response.status}.`,
			);
		}

		let result: TurnstileResponse;

		try {
			result = (await response.json()) as TurnstileResponse;
		} catch (error) {
			throw new ContactServiceUnavailableError(
				"Turnstile returned an unreadable response.",
				{ cause: error },
			);
		}
		const usesTestSecret = secretKey === TURNSTILE_TEST_SECRET;
		const hostname = result.hostname?.toLowerCase();
		const hostnameAllowed =
			usesTestSecret ||
			allowedHostnames.length === 0 ||
			(hostname !== undefined && allowedHostnames.includes(hostname));

		return (
			result.success &&
			(usesTestSecret || result.action === "contact") &&
			hostnameAllowed
		);
	},
});
