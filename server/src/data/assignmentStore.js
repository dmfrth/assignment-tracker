// this is the file that actually interacts with the list of assignments
// doesn't care about http or validation, basically just reads / writes the array
// data is kept in memory (resets whenever the server restarts)

let assignments = []; // all assignments currently stored
let nextId = 1; // the id the next assignment will get

// returns all assignments
export function getAll() {
  return assignments;
}

// returns the assignment with this specified id, or undefined if there is not one
export function getById(id) {
  return assignments.find((a) => a.id === id);
}

// adds a new assignment, gives it an id, returns it
export function insert(data) {
  const assignment = { id: nextId++, ...data };
  assignments.push(assignment);
  return assignment;
}

// allows user to change some fields of an existing assignment and return the updated version
// will return as undefined if the assignment doesn't exist
export function update(id, changes) {
  const assignment = getById(id);
  if (!assignment) return undefined;
  Object.assign(assignment, changes); // copies only the changed files
  return assignment;
}

// deletes an assignment - returns true if it was deleted, false if it is not found
export function remove(id) {
  const index = assignments.findIndex((a) => a.id === id);
  if (index === -1) return false;
  assignments.splice(index, 1); // removes one item at that position
  return true;
}

// empties the storage and restarts the ids at 1
// this is what the tests use so every test starts from a clean slate
export function reset() {
  assignments = [];
  nextId = 1;
}