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
//select all sections in the html document by query select tag name
const sectionsHtml = document.querySelectorAll("section");
//select navigation bar ul element and get it by id
const navBarElementID = document.getElementById('navbar__list');
//get the button by id which nav to top of page
const buttonTop = document.getElementById('top');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
//navigation bar function implementation
function navBarImplementation(){
  const docFrag = document.createDocumentFragment();
  //loop through all sections selected
  sectionsHtml.forEach((section)=>{
    //create list element for every section
    var listElement = document.createElement('li');
    /*insert in list element an anchor tag which include:
    -the name of section by getting data-nav attribute
    -href by getting section id to navigate to other sections
    -add class menu__link which is the style element in css
    */
    listElement.innerHTML = `<a class='menu__link' href="#${section.id}">${section.getAttribute("data-nav")}</a>`;
    /*
    listElement.addEventListener("click",()=> {
      section.scrollIntoView({behavior:"smooth", block:"start",inline:"center"});
    });
    */
    //append created list to document Fragment
    docFrag.appendChild(listElement);
  });
  //append document fragment to navigation bar unsorted list in html
  navBarElementID.appendChild(docFrag);
}



//check view port function which passing the section to check if the section in the view port or not
function checkViewPort(section){
  const viewPortElement = section.getBoundingClientRect();
  return(viewPortElement.top <= 200 && viewPortElement.bottom >= 200);
}
//active section function implementation
function activeSectionImplementation(){
  //loop through all sections selected
  sectionsHtml.forEach((section)=>{
    if(checkViewPort(section)){
      //(in view port)
      //add the active class if the section is open by user
      section.classList.add('your-active-class');
      //add background color style to the section in the view port
      section.style.cssText = "background-color:rgba(199, 21, 133, 0.3);";
    }else {
      //(not in view port)
      //remove the active class if the section isn't open by user
      section.classList.remove('your-active-class');
      //remove background color style set to none
      section.style.cssText = "background-color:none;";
    }
  });
}

//go to the top of the page button
function goToTop(){
  window.scrollTo(0,0);
}
// Scroll to anchor ID using scrollTO event
function scroll_to_sections(event){
  event.preventDefault();
  //get the selected section to scroll to
  var sectionSelected = document.querySelector((event.target).getAttribute('href'));
  sectionSelected.scrollIntoView({behavior:"smooth",block:"start",inline:"center"});
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
navBarImplementation();

// Add class 'active' to section when near top of viewport


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click
navBarElementID.addEventListener('click',scroll_to_sections);
// Set sections as active
document.addEventListener('scroll',activeSectionImplementation);
//button to scroll to the top of website page
buttonTop.addEventListener('click',goToTop);
