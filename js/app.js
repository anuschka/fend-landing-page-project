/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navMenu = document.querySelector('#navbar__list');
const options = {
  threshold: 0.5
};

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// TODO: think about performance when adding new elements to the DOM
sections.forEach((section) => {
  const navItem = document.createElement('li');
  navItem.innerHTML = section.getAttribute('data-nav');
  navItem.classList.add('menu__link');
  navMenu.appendChild(navItem);
});

// Add class 'active' to section when near top of viewport

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-active');
    } else {
      entry.target.classList.remove('is-active');
    }
  });
};

const observer = new IntersectionObserver(callback, options);

sections.forEach(section => {
  observer.observe(section);
});


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


