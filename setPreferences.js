let colorMode = localStorage.getItem('colorMode');
function setColorMode() {
	if (colorMode === null) {
		colorMode = 'dark';
		localStorage.setItem('colorMode', colorMode);
	}
	setImagesMode(colorMode);
	if (colorMode === 'light')
	{
		switchCSSMode();
		localStorage.setItem('colorMode', 'light');
	}
}

let snowAnim = localStorage.getItem('snowAnim');
function setSnowAnim() {
	if (snowAnim === null) {
		snowAnim = 'true';
		localStorage.setItem('snowAnim', snowAnim);
		console.log(snowAnim, 'snowAnim null');
	}
	if (snowAnim === 'false')
		toggleSnow();
}

setColorMode();
setSnowAnim(); 