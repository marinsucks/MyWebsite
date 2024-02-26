let modePreference = localStorage.getItem('modePreference');

function setMode() {
	console.log(modePreference);
	if (modePreference === 'dark')
		toggleMode();
}

function toggleMode() {	
	
	const root = document.documentElement;
	const background = getComputedStyle(root).getPropertyValue('--background');
	const text = getComputedStyle(root).getPropertyValue('--text');
	root.style.setProperty('--background', text);
	root.style.setProperty('--text', background);
	
	let opposite = modePreference === 'dark' ? 'light' : 'dark';
	const images = document.querySelectorAll('img');
	images.forEach((image) => {
		const src = image.getAttribute('src');
		const newSrc = src.replace(modePreference, opposite);
		image.setAttribute('src', newSrc);
	});

	modePreference = opposite;
	localStorage.setItem('modePreference', modePreference);
}
