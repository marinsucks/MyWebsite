function switchCSSMode()
{
	const root = document.documentElement;
	const background = getComputedStyle(root).getPropertyValue('--background');
	const background_dimmed = getComputedStyle(root).getPropertyValue('--background-dimmed');
	const text = getComputedStyle(root).getPropertyValue('--text');
	const text_dimmed = getComputedStyle(root).getPropertyValue('--text-dimmed');

	const buttons = document.querySelectorAll('button');
	let transitionValue;
	buttons.forEach((button) => 
	{
		transitionValue = getComputedStyle(button).getPropertyValue('transition');
		button.style.setProperty('transition', 'none');
	});

	root.style.setProperty('--background', text);
	root.style.setProperty('--background-dimmed', text_dimmed);
	root.style.setProperty('--text', background);
	root.style.setProperty('--text-dimmed', background_dimmed);

	buttons.forEach((button) => 
	{
		setTimeout(() =>
		{
			button.style.setProperty('transition', transitionValue);
		}, 0);
	});
}

function setImagesMode(newMode){
	let oldMode = newMode === 'dark' ? 'light' : 'dark';

	const images = document.querySelectorAll('img');
	images.forEach((image) => 
	{
		const src = image.getAttribute('src');
		if (src.includes('-light') || src.includes('-dark')) 
		{
			const newSrc = src.replace(oldMode, newMode);
			image.setAttribute('src', newSrc);
		}
	});
}

function switchMode() {
	let newMode = colorMode === 'dark' ? 'light' : 'dark';
	setImagesMode(newMode);
	switchCSSMode();
	colorMode = newMode;
	localStorage.setItem('colorMode', colorMode);
}