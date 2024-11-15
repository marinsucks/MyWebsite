let toggled_tags = [];

function setButtonColor(tag, setting)
{
	let button = document.querySelector(`.${tag}-button`);
	let color = getComputedStyle(document.documentElement).getPropertyValue(setting);
	button.style.backgroundColor = color;
}

function hideTag(tag) 
{
	console.log('hideTag() called with param: `' + tag + '`');
	let selector = tag ? `.${tag}-project` : '[class*="-project"]';
	let elements = document.querySelectorAll(selector);
	elements.forEach((element, index) => {
		setTimeout(() => {
			element.classList.remove('visible');
			element.classList.add('hidden');
		}, index * 100);
	});
	if (tag)
	{
		toggled_tags = toggled_tags.filter(str => str !== tag);
		setButtonColor(tag, '--background-dimmed');
	}	
	console.log('hideTag() finished.');
}

function showTag(tag)
{
	console.log('showTag() called with param: `' + tag + '`');
	let selector = tag ? `.${tag}-project` : '[class*="-project"]';
	let elements = document.querySelectorAll(selector);
	let was_found = false;

	elements.forEach((element) => {
		console.log('showTag(): ' + element.className + ', ' + element.innerHTML.split('\n')[2].trim());
		element.classList.remove('hidden');
		element.classList.add('visible');
		//element.addEventListener('transitionend', () => {
		//	element.style.display = 'flex';
		//}, { once: true });
		was_found = true;
	});
	if (tag && was_found)
	{
		toggled_tags.push(tag);
		setButtonColor(tag, `--${tag}-tag`);
	}	
	else if (tag && !was_found)
		console.log('showTag(): `' + tag + '` not found.');
	console.log('showTag() finished.');
}

function toggleProject(tag) 
{
	// If no tags are toggled, hide all projects first.
	if (!toggled_tags[0])
		hideTag(null);
	
	if (toggled_tags.includes(tag) && toggled_tags.length > 1)
		hideTag(tag);
	else if (toggled_tags.includes(tag) && toggled_tags.length === 1)
	{
		showTag(null);
		setButtonColor(tag, '--background-dimmed');
		toggled_tags = [];
	}
	else
		showTag(tag);
}
