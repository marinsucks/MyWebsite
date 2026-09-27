export class InvalidChallengeError extends Error {
	constructor() {
		super("The anti-bot challenge is invalid or expired.");
		this.name = "InvalidChallengeError";
	}
}

export class InvalidContactPayloadError extends Error {
	constructor() {
		super("The contact payload is invalid after normalization.");
		this.name = "InvalidContactPayloadError";
	}
}

export class ContactServiceUnavailableError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = "ContactServiceUnavailableError";
	}
}
