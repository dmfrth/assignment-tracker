/*finds the form element in HTML and stores it in the variable 'form'*/
const form = document.querySelector("form");

/*finds the HTML elements whose ID is assignment-list*/
const assignmentList = document.getElementById("assignment-list");

/*keeps an eye on the form and looks for when "submit" happens, aka
when the form is submitted, the code below will happen*/
form.addEventListener("submit", function(event) {

    /*stops the page from reloading itself when the form is submitted*/
    event.preventDefault();

    /*gives the value of whatever the user typed in to the variable assignment-name*/
    const assignmentName = document.getElementById("assignment-name").value;

    /*gives the value of whatever the user typed in to the variable course*/
    const course = document.getElementById("course").value;

    /*gives the value of whatever the user typed in to the variable due-date*/
    const dueDate = document.getElementById("due-date").value;

    /*logs what the console is receiving so we know if its receiving the submission to the form*/
    console.log(assignmentName);
    console.log(course);
    console.log(dueDate);

    /*creates an empty div and calls it assignment*/
    const assignment = document.createElement("div");
    assignment.classList.add("assignment"); /*this will allow us to change the format of the assignments list
    because we created the class "assignment", which we can change with .assignment in the css file.*/

    /*this assigns the values stored in each variable to each {} */
    assignment.innerHTML = `
    <h3>${assignmentName}</h3>
    <p>Course: ${course}</p>
    <p>Due: ${dueDate}</p>
    `;

    /*this takes the input assignment and puts it inside the assignments list*/
    assignmentList.appendChild(assignment);


});