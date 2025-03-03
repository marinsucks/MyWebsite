const httpCodes = [
	{ code: 100, reason: "Continue" },
	{ code: 101, reason: "Switching Protocols" },
	{ code: 200, reason: "OK" },
	{ code: 201, reason: "Created" },
	{ code: 202, reason: "Accepted" },
	{ code: 203, reason: "Non-Authoritative Information" },
	{ code: 204, reason: "No Content" },
	{ code: 205, reason: "Reset Content" },
	{ code: 206, reason: "Partial Content" },
	{ code: 300, reason: "Multiple Choices" },
	{ code: 301, reason: "Moved Permanently" },
	{ code: 302, reason: "Found" },
	{ code: 303, reason: "See Other" },
	{ code: 304, reason: "Not Modified" },
	{ code: 305, reason: "Use Proxy" },
	{ code: 307, reason: "Temporary Redirect" },
	{ code: 400, reason: "Bad Request" },
	{ code: 401, reason: "Unauthorized" },
	{ code: 402, reason: "Payment Required" },
	{ code: 403, reason: "Forbidden" },
	{ code: 404, reason: "Not Found" },
	{ code: 405, reason: "Method Not Allowed" },
	{ code: 406, reason: "Not Acceptable" },
	{ code: 407, reason: "Proxy Authentication Required" },
	{ code: 408, reason: "Request Time-out" },
	{ code: 409, reason: "Conflict" },
	{ code: 410, reason: "Gone" },
	{ code: 411, reason: "Length Required" },
	{ code: 412, reason: "Precondition Failed" },
	{ code: 413, reason: "Request Entity Too Large" },
	{ code: 414, reason: "Request-URI Too Large" },
	{ code: 415, reason: "Unsupported Media Type" },
	{ code: 416, reason: "Requested Range Not Satisfiable" },
	{ code: 417, reason: "Expectation Failed" },
	{ code: 500, reason: "Internal Server Error" },
	{ code: 501, reason: "Not Implemented" },
	{ code: 502, reason: "Bad Gateway" },
	{ code: 503, reason: "Service Unavailable" },
	{ code: 504, reason: "Gateway Time-out" },
	{ code: 505, reason: "HTTP Version Not Supported" }
];

const lastShownCodes = [];

function getRandomHttpCode() {
	let randomIndex;
	let randomCode;

	do {
		randomIndex = Math.floor(Math.random() * httpCodes.length);
		randomCode = httpCodes[randomIndex];
	} while (lastShownCodes.includes(randomCode.code));

	lastShownCodes.push(randomCode.code);
	if (lastShownCodes.length > 10)
		lastShownCodes.shift();

	return randomCode;
}

function fadeIn(element, duration) {
	element.style.opacity = 0;
	let opacity = 0;
	const interval = 50;
	const increment = interval / duration;

	function increase() {
		opacity += increment;
		if (opacity >= 1) {
			opacity = 1;
			clearInterval(fading);
		}
		element.style.opacity = opacity;
	}

	const fading = setInterval(increase, interval);
}

function fadeOut(element, duration) {
	let opacity = 1;
	const interval = 50;
	const decrement = interval / duration;

	function decrease() {
		opacity -= decrement;
		if (opacity <= 0) {
			opacity = 0;
			clearInterval(fading);
		}
		element.style.opacity = opacity;
	}

	const fading = setInterval(decrease, interval);
}

function updateHttpStatus() {
	const httpCodeElement = document.querySelector('.http-code');
	const httpReasonElement = document.querySelector('.http-reason');
	const { code, reason } = getRandomHttpCode();

	fadeOut(httpCodeElement, 1000);
	fadeOut(httpReasonElement, 1000);

	setTimeout(() => {
		httpCodeElement.textContent = code;
		httpReasonElement.textContent = reason;

		fadeIn(httpCodeElement, 1000);
		fadeIn(httpReasonElement, 1000);
	}, 1000);
}

setInterval(updateHttpStatus, 2500);