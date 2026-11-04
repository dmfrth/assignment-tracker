# Assignment Tracker Application Summary
## Project Team: Danielle Forth and Ryan Sobocienski

### Short Analysis:

Assignment Tracker is a web application designed to help students keep track of and organize their assignment deadlines. Users can enter assignments, associate them with a course, view their assignments in a list, edit them, mark assignments as completed, and remove assignments they no longer need. It is now a React single page app that communicates with an Express Rest API, so all assignment data is handled by the back end.

### Current Features:

* Add Assignments: Users enter an assignment name, course name, and due date through a form, all three fields are required.
* View Assignments: Submitted assignments appear in the “My Assignments” section with their name, course, and due date.
* Sort by due date: Assignments are displayed with the earliest due dates first.
* Filter assignments: Users can choose to view all assignments, active/incomplete assignments, or just the completed assignments.
* Track completion: Users can check off a box to mark an assignment as completed. These are displayed with a strikethrough to signify completion.
* Delete assignments: Users can remove individual assignments from the list.
* Loading and error messages: The app shows a loading message while data is being fetched, and has a clear error message format with a “Try Again” button when the server can’t be reached or if the assignment doesn’t exist.
* Responsive layout: The interface adjusts its layout for mobile, tablet, and desktop screen sizes.

### Current Status and Limitations:

The core pieces of the assignment tracker are in place in the current version. The back end has an automated test file that checks the main routes. Assignment data is stored in the server’s memory, so assignments survive a page refresh but are lost and reset to the two sample assignments each time the server restarts. 

### Known Bugs, Shortcuts, and Unfinished Pieces

* Known bugs: There were no known bugs found during testing.
* Shortcuts:
    * Data is held in the server memory, there is no database.
    * Users do not have accounts, so everyone who uses the app sees the same list.
* Unfinished Pieces:
    * Better storage (database?), login for different users.
    * Deleting an item from the list does not ask for a confirmation from the user like the detail (edit) page does.
    * Ideas we considered but did not implement include sorting by course and color coding assignments.

