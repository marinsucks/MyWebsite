let prefMode = localStorage.getItem('prefMode');

document.addEventListener("DOMContentLoaded", function() {
	setMode();
});

function setMode() {
	if (prefMode === null) {
		prefMode = 'light';
		localStorage.setItem('prefMode', prefMode);
	}
	console.log(prefMode);
	setImagesMode(prefMode);
	if (prefMode === 'dark')
	{
		switchCSSMode();
		localStorage.setItem('prefMode', 'dark');
	}
}

function switchCSSMode(){
	const root = document.documentElement;
	const background = getComputedStyle(root).getPropertyValue('--background');
	const text = getComputedStyle(root).getPropertyValue('--text');
	root.style.setProperty('--background', text);
	root.style.setProperty('--text', background);
}

function setImagesMode(newMode){
	let oldMode = newMode === 'dark' ? 'light' : 'dark';

	const images = document.querySelectorAll('img');
	images.forEach((image) => {
		const src = image.getAttribute('src');
		console.log("replacing ", oldMode, " with ", newMode, " in ", src);
		const newSrc = src.replace(oldMode, newMode);
		image.setAttribute('src', newSrc);
	});
}

function switchMode() {	
	let newMode = prefMode === 'dark' ? 'light' : 'dark';
	setImagesMode(newMode);
	switchCSSMode();
	console.log("ex theme :", prefMode);
	prefMode = newMode;
	localStorage.setItem('prefMode', prefMode);
	console.log("new theme :", prefMode);
}
