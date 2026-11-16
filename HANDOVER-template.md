# HANDOVER.md

## 1\. What this app does

This website is an assignment tracker. It allows users to set a due date, class and course for a given task.
The user can then sort these by completed, incompleted, and all



## 2\. How to run it 

Follow the guide in README
Just in case, the README / proper branch is "milestone-2"
Our branches are a bit of a mess, the handoff branch is not the handoff, sorry.
Last tested from a fresh clone on 11/16 , by Ryan Sobocienski



## 3\. Current state

The site functions for it's purpose, but could be improved. (This might overlap a bit with unfinished work), but we don't have anything half done, just ideas that aren't started on.
Example : The data is not stored in the server, or with accounts, so whenever the page is refreshed you lose everything.



## 4\. Important decisions

Two or three choices already made, and why.

## 5\. Known problems and unfinished work

Data is not stored anywhere (As explained in 3)

The delete button for assignments on the home page deletes them instantly, but the delete button the assignment detail page requires a second confirmation



## 7\. Where things live 

Data is kept in a memory
Api Contract -> Milestone2/docs/API\_CONTRACT

Main Back end -> Milestone2/server/src
Main Front end -> Milestone2/client/src




## 8\. Suggested first steps for Milestone 3 (authors)

Make the data stored somewhere, so that the site functions when you reopen it
Fix the delete button confirmation inconsistencies



**Bonus suggestions :**
\*This is just if you want more to work on , do what you want with the site



\-Allow users to sort by class, due date, or alphabetically if they wish, instead of all, active and completed



\-Allow users to make an assignment without one or two parameters
(Example, an assignment with no due date, or no class, so that you could treat it as a to-do list)

\-Allow users to change colors / cosmetics

&#x09;-Light / Dark Mode

&#x09;-Assign colors for easier visuals (Math assignment is red, science is blue, ect)











**I moved the Receiving pod work down here, these are for the group receiving our work to do.
If that's you, hello, please fill this out.**

## 6\. Handover checks (receiving pod)

Version received: commit \_\_\_\_\_\_
The four checks: did each pass as received? After the handoff fixes?



## 9\. Takeover Notes (receiving pod): one sentence for each

* Do we understand what the app does and how the code is organized?
* Can we run it from a fresh clone?
* Do we know what is complete and what isn't?
* Do we know the important decisions and the known problems?
* Do we know what we would do first for Milestone 3?

