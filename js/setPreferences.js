/**
 * Retrieves the color mode from local storage and sets it if it is not already set.
 */
let colorMode = localStorage.getItem('colorMode');
if (colorMode === null) 
{
	colorMode = 'dark';
	localStorage.setItem('colorMode', colorMode);
}

setPreferences();

function setPreferences()
{
	setColorMode();
	setSnowAnim(); 
}

/**
 * Loads the header and footer HTML files and executes a callback function when both are loaded.
 * @param {Function} func - The callback function to be executed after the header and footer are loaded.
 * @param {any} param - The parameter to be passed to the callback function.
 */
function loadHeaderFooter(func, param) 
{
	$(document).ready(function() 
	{
		$("#header").load("header.html", function() 
		{
				$("#footer").load("footer.html", function() 
			{
					if ($("#header").length && $("#footer").length) 
					{
						func(param);
					}
			});
		});
	});
}

/**
 * Sets the color mode of the website to light if specified.
 */
function setColorMode()
{
	if (colorMode === 'light')
	{
		switchCSSMode();
		loadHeaderFooter(setImagesMode, 'light');
		localStorage.setItem('colorMode', 'light');
	}
}

/**
 * Retrieves the snow animation preference from local storage and sets it if it is not already set.
 */
function setSnowAnim() 
{
	let snowAnim = localStorage.getItem('snowAnim');
	if (snowAnim === null) 
	{
		snowAnim = 'true';
		localStorage.setItem('snowAnim', snowAnim);
	}
	if (snowAnim === 'false')
		toggleSnow();
}
