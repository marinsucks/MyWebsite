$(document).ready(function() {
	const codeElement = document.querySelector('code.reveal');
	if (codeElement) {
		// Clone the content to manipulate it without altering the original
		const clonedCodeElement = codeElement.cloneNode(true);
		const elements = Array.from(clonedCodeElement.childNodes);
		codeElement.textContent = ''; // Clear the original content

		let delay = 0;

		elements.forEach((el) => {
			if (el.nodeType === Node.TEXT_NODE) {
				// For text, display each letter with a delay
				[...el.textContent].forEach((char) => {
					setTimeout(() => {
						codeElement.append(document.createTextNode(char));
					}, delay);
					delay += 30; // Increment the delay for the next letter
				});
			} else if (el.tagName === 'SPAN') {
				// For <span>, display it directly without delay
				const newSpan = document.createElement('span');
				newSpan.innerHTML = el.innerHTML;
				newSpan.className = el.className; // Add the class of the original span
				setTimeout(() => {
					codeElement.appendChild(newSpan);
				}, delay);
			} else if (el.tagName === 'BR') {
				// For <br>, insert it directly
				setTimeout(() => {
					codeElement.appendChild(document.createElement('br'));
				}, delay);
			}
		});
		setTimeout(() => {
			const cursorElement = document.createElement('span');
			cursorElement.className = 'cursor';
			cursorElement.textContent = '█';
			codeElement.appendChild(cursorElement);

			setInterval(() => {
				cursorElement.style.visibility = cursorElement.style.visibility === 'hidden' ? 'visible' : 'hidden';
			}, 500);
		}, delay);
	}
});