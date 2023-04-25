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
let counter = 0;

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
    counter ++;
  const navItem = document.createElement('li');
  navItem.innerHTML = section.getAttribute('data-nav');
  navItem.classList.add('menu__link');
  navItem.setAttribute('data-section-id', `section${counter}`);
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

// Step 1: Listen for click events on the navigation menu items
const menuItems = document.querySelectorAll('.menu__link');
menuItems.forEach(item => {
  item.addEventListener('click', event => {
    // Step 2: Prevent the default link behavior
    event.preventDefault();

    // Step 3: Get the ID of the section to scroll to
    const sectionId = item.getAttribute('data-section-id');

    // Step 4: Scroll to the section
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active

// Add class 'active' to section when it is near top of viewport
function makeActive() {
  for (const section of sections) {
    const box = section.getBoundingClientRect();
    // You can play with the values in the "if" condition to further make it more accurate.
    if (box.top <= 150 && box.bottom >= 150) {
      // Apply active state on the current section and the corresponding Nav link.
      const sectionId = section.getAttribute('id');
      const navElement = document.querySelector(`[data-section-id="${sectionId}"]`);
      navElement.classList.add('is-active');
    } else {
      // Remove active state from other section and corresponding Nav link.
    }
  }
}

// Make sections active
document.addEventListener("scroll", function() {
  makeActive();
});
