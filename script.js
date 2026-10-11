// DOM references - these variables point to HTML elements that the js needs to access
const form = document.querySelector("#assignment-form");
const assignmentList = document.querySelector("#assignment-list");
const filterSelect = document.querySelector("#filter");
const statusMessage = document.querySelector("#status-message");

// data

// stores assignments currently in memory
let assignments = [];
let currentFilter = "all"; // remembers which filter the user has selected, all means every assignment is displayed
let nextId = 1; // each assignment as a unique ID

// adds a new assignment to the assignments array
// creates an assignment object and is given the next available unique ID
// new assignments automatically start as incomplete (completed: false)
function addAssignment({ name, course, dueDate }) {
    assignments.push({ id: nextId++, name, course, dueDate, completed: false });
}

// removes an assignment based on its ID
// filter() creates a new array with every assignment except the selected one
function deleteAssignment(id) {
    assignments = assignments.filter((a) => a.id !== id);
}

// changes the completion status of an assignment
// find() searches for the assignment with the matching ID
function toggleAssignment(id) {
    const assignment = assignments.find((a) => a.id === id);
    if (assignment) assignment.completed = !assignment.completed;
}

// application of the selected filter 

//returns only assignments that should currently be displayed based on the selected filter
function getVisibleAssignments() {
    return assignments
    .filter((a) => {
        if (currentFilter === "active") return !a.completed; // show incomplete assignments only
        if (currentFilter === "completed") return a.completed; // show completed assignments only
        return true; // otherwise show all assignments by default
    })
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate)); // sorts by due date, earliest at the top. also matches the yyyy/mm/dd format we used in the date picker
}

// DOM logic

// creates the HTML elements for one assignment and returns its list item
function createAssignmentItem({ id, name, course, dueDate, completed }) {
    const item = document.createElement("li"); // holds assignments details
    item.classList.add("assignment"); // adds the CSS class so we can style the assignments
    item.classList.toggle("is-complete", completed); // add or remove completion depending on status
    item.dataset.id = id; // stores the assignment ID in the HTML element so even listeners can identify which assignment the user interacts with

    // creates a checkbox so the user can have the satisfaction of checking off assignments they've completed.
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.setAttribute("aria-label", `Mark "${name}" as complete`); // accessible name

    // container for assignment's text details
    const details = document.createElement("div");
    details.classList.add("assignment-details");

    // creates a heading to display the assignment name
    const title = document.createElement("h3");
    title.textContent = name;

    // creates a paragraph which displays the course name
    const courseLine = document.createElement("p");
    courseLine.textContent = `Course: ${course}`;

    // creates a paragraph displaying the due date the user previously entered
    const dueLine = document.createElement("p");
    dueLine.textContent = `Due: ${dueDate}`;

    // places title, course, and due date inside of the details container
    details.append(title, courseLine, dueLine);

    // creates a button for deleting an assignment
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-button"); // adds a CSS class so the delete button can be styled
    deleteButton.dataset.action = "delete"; // makes this button a delete action for the "click" event listener
    deleteButton.textContent = "Delete"; // text displayed on the button itself
    deleteButton.setAttribute("aria-label", `Delete "${name}"`); // clear labeling and purpose (accessibility)

    item.append(checkbox, details, deleteButton); // adds checkbox, details, and delete button to the list item
    return item; // returns the completed list item so render() can display it
}

// updates the assignment list on the page to match the current data/filter
function render() {
    const visible = getVisibleAssignments(); // checks which assignments should be visible according to the filter, retrieves them
    assignmentList.replaceChildren(...visible.map(createAssignmentItem)); // removes existing list items and replaces with new ones, map() function creates one list item for each visible assignment

    if (visible.length > 0) { // if assignments are visible, hide the empty list message
        statusMessage.hidden = true;
    } else {
        statusMessage.hidden = false; // if no assignments are visible, display a different message
        statusMessage.textContent = // displays a different message deepnding on whether any assignments exist
          assignments.length === 0
            ? "Your assignments will appear below."
            : `No ${currentFilter} assignments to show.`;
    }
}

// event listeners - responses to actions peformed by the user

// behavior: add assignment - runs when the user submits the add assignment form
form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevents browser from reloading the page
    addAssignment(Object.fromEntries(new FormData(form))); // converts text in the form fields into an object which is passed to addAssignment() to store it there
    form.reset(); // clears form fields after assignment is added
    render(); // refreshes the page's assignment list to show the new assignment that was just added
});

// behavior: delete an assignment
assignmentList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-action='delete']"); // checks if the clicked element is a delete button
    if (!deleteButton) return; // if not a delte button, do nothing

    deleteAssignment(Number(deleteButton.closest(".assignment").dataset.id)); // finds the list item, reads the stored ID, and converts the ID from text into a number and deletes the assignment
    render(); // list is refreshed after deleting
});

// behavior: complete - what happens when a checkbox is checked off
assignmentList.addEventListener("change", (event) => {
    if (event.target.type !== "checkbox") return; // ignore changes not from a checkbox

    toggleAssignment(Number(event.target.closest(".assignment").dataset.id)); // finds assignment associated with checkbox and toggles its status
    render(); // refreshes the list to update the checkbox and completion styling
});

// behavior: apply the filter to the list - runs when the user selects a different filter option
filterSelect.addEventListener("change", () => {
    currentFilter = filterSelect.value; // saves selected option so getVisibleAssignments() can use it
    render(); // refreshes list to show assignments that match the filter
});

render();