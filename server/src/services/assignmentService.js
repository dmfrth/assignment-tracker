// this is where we validate input, look things up, or decide when to report a certain error
import * as store from "../data/assignmentStore.js";
import { HttpError } from "../errors.js";

// a due date must follow the format YYYY-MM-DD
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// returns true only if the specified date is a real calendar date in the correct format (above)
function isValidDate(value) {
  if (typeof value !== "string" || !DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

// checks the fields in input and returns clean copy of the valid ones
// when requireAll is true, name, course, and dueDate must all be filled out
// if anything is wrong, a 400 error will be thrown and list whatever problems are there
function validateFields(input, { requireAll }) {
  // body must be a plain json object
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new HttpError(400, "Request body must be a JSON object");
  }

  const fields = {}; // problems found here, specified by field name
  const clean = {}; // values we are keeping because they look fine / fit the format

  // name and course must also be non-empty text
  for (const [key, label] of [["name", "Name"], ["course", "Course"]]) {
    if (input[key] === undefined) {
      if (requireAll) fields[key] = `${label} is required`;
    } else if (typeof input[key] !== "string" || input[key].trim() === "") {
      fields[key] = `${label} must be a non-empty string`;
    } else {
      clean[key] = input[key].trim(); // remove extra spaces at the start / end
    }
  }

  // must be a real date in yyyy-mm-dd format
  if (input.dueDate === undefined) {
    if (requireAll) fields.dueDate = "Due date is required";
  } else if (!isValidDate(input.dueDate)) {
    fields.dueDate = "Due date must be a valid date in YYYY-MM-DD format";
  } else {
    clean.dueDate = input.dueDate;
  }

  if (input.completed !== undefined) {
    if (typeof input.completed !== "boolean") {
      fields.completed = "Completed must be true or false";
    } else {
      clean.completed = input.completed;
    }
  }

  // report any problems that are found as a single 400 error
  if (Object.keys(fields).length > 0) {
    throw new HttpError(400, "Validation failed", fields);
  }
  return clean;
}

// turns the :id text from the URL into a number, or returns 400 if the number is anything but positive / whole
export function parseId(raw) {
  if (!/^[1-9]\d*$/.test(raw)) throw new HttpError(400, "Invalid id");
  return Number(raw);
}

// returns all assignments, can be filtered by their active or completed status as well
export function listAssignments(status) {
  if (status === undefined) return store.getAll();
  if (status === "active") return store.getAll().filter((a) => !a.completed);
  if (status === "completed") return store.getAll().filter((a) => a.completed);
  throw new HttpError(400, "status must be 'active' or 'completed'");
}

// returns one assignment, pr throws a 404 error if it is not found
export function getAssignment(id) {
  const assignment = store.getById(id);
  if (!assignment) throw new HttpError(404, "Assignment not found");
  return assignment;
}

// validates the request body, creates a new assignment
// new assignments automatically start as incomplete unless the body specifies otherwise
export function createAssignment(body) {
  const clean = validateFields(body ?? {}, { requireAll: true });
  return store.insert({ completed: false, ...clean });
}

// validates request body and updates only the fields that were sent
export function updateAssignment(id, body) {
  const clean = validateFields(body ?? {}, { requireAll: false });
  if (Object.keys(clean).length === 0) {
    throw new HttpError(
      400,
      "Request body must include at least one of: name, course, dueDate, completed"
    );
  }
  getAssignment(id); // throws 404 if it doesn't exist
  return store.update(id, clean);
}

// deletes an assignment
export function deleteAssignment(id) {
  getAssignment(id); // throws 404 if it doesn't exist
  store.remove(id);
}