let toggled_tags = [];

function setButtonColor(tag, setting)
{
	let button = document.querySelector(`.${tag}-button`);
	let color = getComputedStyle(document.documentElement).getPropertyValue(setting);
	button.style.backgroundColor = color;
}

function hideTag(tag) 
{
	let selector = tag ? `.${tag}-project` : '[class*="-project"]';
	let elements = document.querySelectorAll(selector);
	elements.forEach((element) => {
		element.style.display = 'none';
	});
	if (tag)
	{
		toggled_tags = toggled_tags.filter(str => str !== tag);
		setButtonColor(tag, '--background-dimmed');
	}	
}

function showTag(tag)
{
	let selector = tag ? `.${tag}-project` : '[class*="-project"]';
	let elements = document.querySelectorAll(selector);
	let was_found = false;
	elements.forEach((element) => {
		element.style.display = 'block';
		was_found = true;
	});
	if (tag && was_found)
	{
		toggled_tags.push(tag);
		setButtonColor(tag, `--${tag}-tag`);
	}	
	else if (tag && !was_found)
		console.log('showTag(): `' + tag + '` not found.');
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
