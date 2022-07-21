// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');
const navToggle = document.querySelector('.nav-toggle');

navToggle.addEventListener('click', function () {
	// below is if we hardcode the show-links size
	// linksContainer.classList.toggle('show-links');

	// height for container will be zero
	const containerHeight = linksContainer.getBoundingClientRect().height;
	// console.log(containerHeight);

	// height for links will NOT be zero
	const linksHeight = links.getBoundingClientRect().height;
	// console.log(linksHeight);

	if (containerHeight === 0) {
		linksContainer.style.height = `${linksHeight}px`;
	} else {
		linksContainer.style.height = 0;
	}
});

const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');
// ********** fixed navbar ************
window.addEventListener('scroll', function () {
	// how far you have scrolled
	// console.log(window.pageYOffset);
	const scrollHeight = window.pageYOffset;
	const navHeight = navbar.getBoundingClientRect().height;
	if (scrollHeight > navHeight) {
		navbar.classList.add('fixed-nav');
	} else {
		navbar.classList.remove('fixed-nav');
	}
	if (scrollHeight > 500) {
		topLink.classList.add('show-link');
	} else {
		topLink.classList.remove('show-link');
	}
});

// ********** smooth scroll ************
// select links

const scrollLinks = document.querySelectorAll('.scroll-link');

// if navigating from the fixed navbar, this will take you to the incorrect place unless this is accounted for (which I have done)
// if the navbar has the fixed-nav class, more needs to be subtracted from the position to account for this

// needs to account for navigation issues caused by clicking on the links from the small screen (as this will be impacted by the containerHeight)
scrollLinks.forEach(function (link) {
	link.addEventListener('click', function (e) {
		// we get the smooth scroll but we want to add additional functionality, so we prevent the default functionality from being applied on click
		e.preventDefault();
		// navigate to specific spot
		// slice skips the hashtag from retrieved ID and doesn't modify original string
		// this is necessary to pass the value into getElementByID (can't have the hashtag)
		const id = e.currentTarget.getAttribute('href').slice(1);
		// console.log(id);
		const element = document.getElementById(id);

		// calculate the heights - can do globally, but this is the only other place these consts are reused
		const navHeight = navbar.getBoundingClientRect().height;
		const containerHeight = linksContainer.getBoundingClientRect().height;
		const fixedNav = navbar.classList.contains('fixed-nav');

		// subtracting navHeight will cause issues when navHeight is different (e.g. when navbar isn't fixed, or using small screen menu which expands the navbar)
		let position = element.offsetTop - navHeight;
		// let position = element.offsetTop;
		// console.log(position);

		// below is accounting for the fixed navbar
		if (!fixedNav) {
			position = position - navHeight;
		}

		// if the links has been opened up (i.e. on the small screen using the toggle button) and thus the height of the navbar is larger than 82
		if (navHeight > 82) {
			position = position + containerHeight;
		}

		window.scrollTo({
			left: 0,
			top: position,
		});
		linksContainer.style.height = 0;
	});
});
