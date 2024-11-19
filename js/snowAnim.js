// Fonction pour activer/désactiver l'ID "snow"
function toggleSnow()
{
	const htmlElement = document.querySelector('html');
	if (htmlElement.id === 'snow')
	{
		htmlElement.id = '';
		localStorage.setItem('snowAnim', 'false');
	}
	else
	{
		htmlElement.id = 'snow';
		localStorage.setItem('snowAnim', 'true');
	}
}

// Event listener for the space key
window.addEventListener('keydown', function(event)
{
	if (event.code === 'KeyH')
		toggleSnow();
});

// Disable snow animation if the user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
	const htmlElement = document.querySelector('html');
	htmlElement.id = '';
	localStorage.setItem('snowAnim', 'false');
}

// Event listener for clicks on anything other than a link on a smartphone
// TODO: Handle touch events on iPhone when NOT scrolling
//window.addEventListener('touchend', function(event) {
//	if (event.target.tagName !== 'A' && event.target.tagName !== 'BUTTON') {
//		toggleSnow();
//	}
//});