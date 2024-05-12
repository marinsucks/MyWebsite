function switchCSSMode(){
	const root = document.documentElement;
	const background = getComputedStyle(root).getPropertyValue('--background');
	const text = getComputedStyle(root).getPropertyValue('--text');

	const buttons = document.querySelectorAll('button');
	let transitionValue;
	buttons.forEach((button) => {
		transitionValue = getComputedStyle(button).getPropertyValue('transition');
		button.style.setProperty('transition', 'none');
	});

	root.style.setProperty('--background', text);
	root.style.setProperty('--text', background);

	buttons.forEach((button) => {
		setTimeout(() => {
			button.style.setProperty('transition', transitionValue);
		}, 0);
	});
}

function setImagesMode(newMode){
	let oldMode = newMode === 'dark' ? 'light' : 'dark';

	const images = document.querySelectorAll('img');
	images.forEach((image) => {
		const src = image.getAttribute('src');
		const newSrc = src.replace(oldMode, newMode);
		image.setAttribute('src', newSrc);
	});
}

function switchMode() {
	let newMode = colorMode === 'dark' ? 'light' : 'dark';
	setImagesMode(newMode);
	switchCSSMode();
	colorMode = newMode;
	localStorage.setItem('colorMode', colorMode);
}