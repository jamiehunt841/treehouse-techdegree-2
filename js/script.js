/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// CONSTS
// Get all the list items on the page.
const listItems = document.querySelectorAll('.student-item');

// This is how many we want to display on the page.
const viewPerPage = 10;

// Get our page element
const pageDiv = document.querySelector('.page');

// Get the name of the student
const nameOfStudent = document.querySelectorAll('.student-details h3');

// Display the page with the correct amount of students being displayed.
function showPage(listItems, pageNumber) {
   // consts that are only used in the function
   const startIndex = (pageNumber * viewPerPage) - viewPerPage;
   const endIndex = (pageNumber * viewPerPage);

   for (let i = 0; i < listItems.length; i += 1) {
      if (i >= startIndex && i < endIndex) {
         listItems[i].style.display = 'block';
      } else {
         listItems[i].style.display = 'none';
      } 
   }
}
   
// Invoke our functions
showPage(listItems, 1);
appendPageLinks(listItems);



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(listItems) {
   // Assign how many listItems we have in the array
   const listLength = listItems.length;
   // Divide how many listItems we have by how many we display per page
   const numOfPages = Math.ceil(listLength/viewPerPage);
   // This will make creating a <div> easier down the road
   const createDivElement = document.createElement('div')

   // Begin the html 
   let beginHtml = `<ul>`;

   // Create the element with our desired ClassName
   createDivElement.className = "pagination";
   
   pageDiv.appendChild(createDivElement);

   // Loop through each item and add a link
   for (let i = 0; i <= numOfPages; i += 1) {
      if (i < numOfPages ) {
         beginHtml += `<li><a href="#">${i+1}</a></li>`
      } else {
         beginHtml += `</ul>`;
      }
   }
   createDivElement.innerHTML = beginHtml;

   const paginationLinkElement = document.querySelectorAll('.pagination a');
   if (paginationLinkElement.length > 0) {
      paginationLinkElement[0].classList.add('active');
      
      for (let i = 0; i < paginationLinkElement.length; i += 1) {

         paginationLinkElement[i].addEventListener('click', () => {

            for (let x = 0; x < paginationLinkElement.length; x += 1) {
               paginationLinkElement[x].classList.remove('active');
            }

            paginationLinkElement[i].classList.add('active');
            showPage(listItems, i+1);
         });
      }
   }   
}


/***
 * addSearchBar function - Adds a search bar to the top of the page.
***/
function addSearchBar() {

   const pageHeader = document.querySelector('.page-header');
   const searchBarDiv = document.createElement('div');

   // Add the div we have created to the page-header
   pageHeader.appendChild(searchBarDiv);

   // Add the class to the div
   searchBarDiv.classList.add("student-search");

   // Add the HTML to the div we have just created
   searchBarDiv.innerHTML = `<input id="search-input" placeholder="Search for students..."><button id="search-button">Search</button>`;
}

// Call the search bar function
addSearchBar()

// We need to select the HTML we have just created.
const search = document.querySelector('#search-input');
const submit = document.querySelector('#search-button');


/***
 * `searchList` function - filters the list of students when a user uses the search bar. 
   In addition calls the `addNoResultAlert` and `adjustPagination` functions.
 * @param {string} searchInput - accepts the value of the `#search-input`.
 * @param {array} names - accepts an array of student names.
 * @param {array} student - accepts an array of student list items.
***/

function searchList(searchInput, names, students) {
   let searchResults = [];

   for (let i = 0; i < students.length; i += 1) {
      students[i].style.display = 'none';
      if (searchInput.value.length !== 0 && names[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
         students[i].style.display = 'block';
         searchResults.push(students[i]);
         showPage(searchResults, 1);
      } else if (searchInput.value.length === 0) {
         students[i].style.display = 'block';
         searchResults.push(students[i]);
         showPage(listItems, 1);
      }
   }
   adjustPagination(searchResults);
   addNoResultAlert(searchResults);
 }


/***
* Called the `searchList` function on `#search-button` click events.
* Called the `searchList` function on `#search-input` keyup events.
***/

 submit.addEventListener('click', (event) => {
   event.preventDefault();
   searchList(search, nameOfStudent, listItems);
 });

 search.addEventListener('keyup', () => {
   searchList(search, nameOfStudent, listItems);
 });


 /**
  * `adjustPagination` function -  removes the existing pagination, and adds new pagination based on the number of students in the filtered list.
  * @param {array} list - accepts an array filtered student list elements.
  ***/

 function adjustPagination(list) {
   const paginationContainer = document.querySelector('.pagination');
    pageDiv.removeChild(paginationContainer);
    appendPageLinks(list);
 }


 /***
  * `addNoResultAlert` function - adds a <p> element to the the `.page` container. The <p> element contains the string 'Your search returned no results'.
  * Called the `addNoResultAlert' function.
  ***/
 function noResultAlert() {
    const noResultAlertContainer = document.createElement('p');
    noResultAlertContainer.className = 'no-result';
    noResultAlertContainer.textContent = "Your search returned no results.";
    pageDiv.appendChild(noResultAlertContainer);
    noResultAlertContainer.style.visibility = 'hidden';
}
noResultAlert();


/***
 * `addNoResultAlert` takes a list and displays a no result message when the list length is 0; otherwise, the no result message is not displayed.
 * @param {array} list - accepts an array of filtered student list elements. 
 ***/

function addNoResultAlert(list) {
   const noResultAlertContainer = document.querySelector('.no-result');
   if (list.length === 0) {
      noResultAlertContainer.style.visibility = 'visible';
   } else {
      noResultAlertContainer.style.visibility = 'hidden';
   }
}


// Remember to delete the comments that came with this file, and replace them with your own code comments.