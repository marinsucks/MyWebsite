const all_tags = ['c', 'cpp', 'devops', 'web'];
let sel_tags = [];

function setButtonColor(tag, setting)
{
	let button = document.querySelector(`.${tag}-button`);
	let color = getComputedStyle(document.documentElement).getPropertyValue(setting);
	button.style.backgroundColor = color;
}

function hideAll()
{
	let element = document.querySelectorAll('[class*="-project"]');
	element.forEach((element) => {
		element.classList.replace('visible', 'hidden');
	});
}

function printSelectedTags()
{
	//select projects - if no tags are selected, show all projects
	let selector = "." + sel_tags.join("-project,.") + "-project";
	if (sel_tags.length === 0)
		selector = '[class*="-project"]';
	let element = document.querySelectorAll(selector);
	let wasfound = false;

	//show only the selected projects
	hideAll();
	element.forEach((element, index) => {
		setTimeout(() => {
			element.classList.replace("hidden", "visible");
		}, index * 100);
		wasfound = true;
	});

	return wasfound;
}

function 	hideTag(tag)
{
	sel_tags = sel_tags.filter(str => str !== tag);
	printSelectedTags();
	setButtonColor(tag, '--background-dimmed');
}

function showTag(tag)
{
	sel_tags.push(tag);
	if (!printSelectedTags())
		throw new Error(`Element with class: ${tag}-project not found.`);
	setButtonColor(tag, `--${tag}-tag`);
}

function toggleProject(tag) 
{	
	if (sel_tags.includes(tag) && sel_tags.length > 1)
		hideTag(tag);
	else if (sel_tags.includes(tag) && sel_tags.length === 1)
	{
		sel_tags = [];
		printSelectedTags();
		setButtonColor(tag, '--background-dimmed');
	}
	else
		showTag(tag);
}




function projectsPageStartup()
{
	document.querySelector('.error-msg').style.display = 'none';
	printSelectedTags();
}
