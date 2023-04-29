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
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navMenu = document.querySelector('#navbar__list');
const options = {
  threshold: 0.5
};
const scrollToTopButton = document.getElementById('scroll-to-top');
let counter = 0;
let sectionId = '';

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * function that builds the navigation menu items using the data-nav 
 * attribute found in each section element
 * 
*/
function buildNavigationForThePage() {
  sections.forEach((section) => {
    counter ++;
    const navItem = document.createElement('li');
    navItem.innerHTML = section.getAttribute('data-nav');
    navItem.classList.add('menu__link');
    navItem.setAttribute('data-section-id', `section${counter}`);
    navMenu.appendChild(navItem);
  });
}

/**
 * Function that adds active class animation for the section that is in the 
 * viewport
 * 
*/
function addClassActiveToSections(){
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
}

/**
 * function that listens on click events for each menu item in navigation
 * and on click smoothly scrolls to the section
 * 
*/
function scrollToAnchorId() {
const menuItems = document.querySelectorAll('.menu__link');

menuItems.forEach(item => {
  item.addEventListener('click', event => {
    //Prevent the default link behavior
    event.preventDefault();

    //Get the ID of the section to scroll to
    const sectionId = item.getAttribute('data-section-id');

    //Scroll to the section
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});
}

/**
 * function that adds active state on the menu item for the section that is
 * active and removes the active state from all other menu items when user 
 * scrolls
 * 
*/
function addRemoveClassActiveToNavigation() {
  const navLinks = document.querySelectorAll('.menu__link');
  function makeActive() {
    for (const section of sections) {
      const box = section.getBoundingClientRect();
      
      if (box.top <= 150 && box.bottom >= 150) {

        // Apply active state on the current section and the corresponding Nav link.
        sectionId = section.getAttribute('id');
          navLinks.forEach(navLink => {
              if(navLink.getAttribute('data-section-id') === sectionId){
                  navLink.classList.add('is-active');
              }else{
                  navLink.classList.remove('is-active');
              }
          });
      }
    }
  }

  /**
   * function that adds a arrow button in the bottom right corner when user 
   * scrolls below the fold of the page
   * 
  */
  function addScrollToTheTopButton() {
  
      if (window.scrollY > window.innerHeight) {
        scrollToTopButton.style.display = 'block';
      } else {
        scrollToTopButton.style.display = 'none';
      }
  
  } 

  /**
   * function that adds a scroll event listener 
   * 
  */
  document.addEventListener("scroll", function() {
    makeActive();
    addScrollToTheTopButton()
  });
}

// build the nav from the sections
buildNavigationForThePage(sections);

// Add class 'active' to section when near top of viewport
addClassActiveToSections();

// Scroll to anchor ID using scrollTO event
scrollToAnchorId();

// Show menu item for section that is active
addRemoveClassActiveToNavigation();


/**
 * Adds an event listener to the scroll to the top button
*/
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});