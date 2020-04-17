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

// Get the names of the students
const nameOfStudents = document.querySelectorAll('.student-details h3');
/*
* Display the page with the correct amount of students being displayed.
* @param {array} listItems - all the list items on the page.
* @param {num} pageNumber - the current number of the page.
*/
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
 * Function to generate, append, and add pagination functionality to the buttons below.
 * @param {array} listItems - all the list items on the page.
 ***/

function appendPageLinks(listItems) {
	// Assign how many listItems we have in the array
	const listLength = listItems.length;
	// Divide how many listItems we have by how many we display per page
	const numOfPages = Math.ceil(listLength / viewPerPage);
	// This will make creating a <div> easier down the road
	const createDivElement = document.createElement('div')

	// Begin the html 
	let beginHtml = `<ul>`;

	// Create the element with our desired ClassName
	createDivElement.className = "pagination";

	pageDiv.appendChild(createDivElement);

	// Loop through each item and add a link
	for (let i = 0; i <= numOfPages; i += 1) {
		if (i < numOfPages) {
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
				showPage(listItems, i + 1);
			});
		}
	}
}


/***
 * displaySearchBar - Adds a search bar to the top of the page.
 ***/
function displaySearchBar() {

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
displaySearchBar()

// We need to select the HTML elements we have just created.
const searchInput = document.querySelector('#search-input');
const submit = document.querySelector('#search-button');


/***
 *  Filters through the list of students when the user interacts with the search box. 
 * @param {string} searchInput - accepts the value of the `#search-input`.
 * @param {array} nameOfStudents - accepts an array of student names.
 * @param {array} students - accepts an array of student list items.
 ***/

function searchListItems(searchInput, nameOfStudents, students) {
	let searchResults = [];

	for (let i = 0; i < students.length; i += 1) {
		students[i].style.display = 'none';
		if (searchInput.value.length !== 0 && nameOfStudents[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
			students[i].style.display = 'block';
			searchResults.push(students[i]);
			showPage(searchResults, 1);
		} else if (searchInput.value.length === 0) {
			students[i].style.display = 'block';
			searchResults.push(students[i]);
			showPage(listItems, 1);
		}
	}
	updatePagination(searchResults);
	appendNoResultAlert(searchResults);
}


/***
 * Add our event listeners to fire when the user interacts with the search box
 ***/

// Clicking the search button
submit.addEventListener('click', (event) => {
	event.preventDefault();
	searchListItems(searchInput, nameOfStudents, listItems);
});

// Search while they are typing
searchInput.addEventListener('keyup', () => {
	searchListItems(searchInput, nameOfStudents, listItems);
});


/***
 * `noResultAlert` function - appends a <p> element containing a string to the the page container.
 ***/
function noResultAlert() {
	const noResultAlertContainer = document.createElement('p');
	noResultAlertContainer.className = 'no-result';
	noResultAlertContainer.textContent = "Your search returned no results.";
	pageDiv.appendChild(noResultAlertContainer);
	noResultAlertContainer.style.visibility = 'hidden';
}

noResultAlert();


/**
 * Updates the pagination depending on how many results we have when searching
 * @param {array} searchResults - accepts an array filtered student list elements.
 ***/

function updatePagination(searchResults) {
	const paginationContainer = document.querySelector('.pagination');
	pageDiv.removeChild(paginationContainer);
	appendPageLinks(searchResults);
}


/***
 * Displays a message if the list length is equal to 0. If not, no message is displayed.
 * @param {array} searchResults - accepts an array of newly filtered student list elements. 
 ***/

function appendNoResultAlert(searchResults) {
	const noResultAlertContainer = document.querySelector('.no-result');

	// Check if we have no search results
	if (searchResults.length === 0) {
		// We have none, display the message
		noResultAlertContainer.style.visibility = 'visible';
	} else {
		// Don't display the message
		noResultAlertContainer.style.visibility = 'hidden';
	}
}
