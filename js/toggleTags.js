function setButtonColor(tag, setting)
{
	let button = document.querySelector(`.${tag}-button`);
	let color = getComputedStyle(document.documentElement).getPropertyValue(setting);
	button.style.backgroundColor = color;
}

class TagManager 
{
	constructor() 
	{
			this.toggledTags = [];
	}
	
	getToggledTags()
	{
		return this.toggledTags;
	}

	setToggledTags(tags)
	{
		this.toggledTags = tags;
	}

	iterateElem(selector, newclass, delay)
	{
		let element = document.querySelectorAll(selector);
		let oldclass = newclass === 'visible' ? 'hidden' : 'visible';
		let wasfound = false;
		element.forEach((element, index) => {
			setTimeout(() => {
				element.classList.replace(oldclass, newclass);
			}, index * delay);
			wasfound = true;
		});
		return wasfound;
	}

	hideTag(tag)
	{
		console.log('hideTag() called with param: `' + tag + '`');
		if (tag === null)
			throw new Error('hideTag: tag cannot be null');

		this.iterateElem(`.${tag}-project`, 'hidden', 100);
		
		this.toggledTags = this.toggledTags.filter(str => str !== tag);
		setButtonColor(tag, '--background-dimmed');
		
		console.log('hideTag() finished.');
	}

	hideAll()
	{
		console.log('hideAllTags() called.');

		this.iterateElem('[class*="-project"]', 'hidden', 0);
		this.toggledTags = [];

		console.log('hideAllTags() finished.');
	}

	showTag(tag)
	{
		console.log('showTag() called with param: `' + tag + '`'); //debug
		if (tag === null)
			throw new Error('showTag: tag cannot be null');

		let wasFound = this.iterateElem(`.${tag}-project`, 'visible', 100);

		if (wasFound)
		{
			this.toggledTags.push(tag);
			setButtonColor(tag, `--${tag}-tag`);
		} 
		else if (!wasFound)
		{
			console.log('showTag(): `' + tag + '` not found.');
		}
		console.log('showTag() finished.');
	}

	showAll()
	{
		console.log('showAllTags() called.');

		this.iterateElem('[class*="-project"]', 'visible', 100);
		this.toggledTags = [];
	
		console.log('showAllTags() finished.');
	}
}

// Usage
const tagManager = new TagManager();

function toggleProject(tag) 
{
	const toggled_tags = tagManager.getToggledTags();

	if (toggled_tags.length === 0)
		tagManager.hideAll();

	if (toggled_tags.includes(tag) && toggled_tags.length > 1)
		tagManager.hideTag(tag);
	else if (toggled_tags.includes(tag) && toggled_tags.length === 1)
	{
		tagManager.showAll();
		setButtonColor(tag, '--background-dimmed');
		//tagManager.setToggledTags([]);
	}
	else
		tagManager.showTag(tag);
}


//let toggled_tags = [];

//function setButtonColor(tag, setting)
//{
//	let button = document.querySelector(`.${tag}-button`);
//	let color = getComputedStyle(document.documentElement).getPropertyValue(setting);
//	button.style.backgroundColor = color;
//}

//function hideTag(tag) 
//{
//	console.log('hideTag() called with param: `' + tag + '`');
//	let selector = tag ? `.${tag}-project` : '[class*="-project"]';
//	let elements = document.querySelectorAll(selector);
//	elements.forEach((element, index) => {
//		setTimeout(() => {
//			element.classList.remove('visible');
//			element.classList.add('hidden');
//		}, index * 100);
//	});
//	if (tag)
//	{
//		toggled_tags = toggled_tags.filter(str => str !== tag);
//		setButtonColor(tag, '--background-dimmed');
//	}	
//	console.log('hideTag() finished.');
//}

//function showTag(tag)
//{
//	console.log('showTag() called with param: `' + tag + '`');
//	let selector = tag ? `.${tag}-project` : '[class*="-project"]';
//	let elements = document.querySelectorAll(selector);
//	let was_found = false;

//	elements.forEach((element) => {
//		console.log('showTag(): ' + element.className + ', ' + element.innerHTML.split('\n')[2].trim());
//		element.classList.remove('hidden');
//		element.classList.add('visible'); // truc bizarre quand showtag
//		was_found = true;
//	});
//	if (tag && was_found)
//	{
//		toggled_tags.push(tag);
//		setButtonColor(tag, `--${tag}-tag`);
//	}	
//	else if (tag && !was_found)
//		console.log('showTag(): `' + tag + '` not found.');
//	console.log('showTag() finished.');
//}
