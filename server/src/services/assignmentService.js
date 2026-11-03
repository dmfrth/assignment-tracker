import * as store from "../data/assignmentStore.js";
import { HttpError } from "../errors.js";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// for real calendar dates
function isValidDate(value) {
  if (typeof value !== "string" || !DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

// checks fields in `input`.
// name/course/dueDate must be present (used for create).
// without it, only the fields that were sent are checked (used for partial update).
// returns a clean object of valid fields, or throws a 400 listing every problem.
function validateFields(input, { requireAll }) {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new HttpError(400, "Request body must be a JSON object");
  }

  const fields = {};
  const clean = {};

  for (const [key, label] of [["name", "Name"], ["course", "Course"]]) {
    if (input[key] === undefined) {
      if (requireAll) fields[key] = `${label} is required`;
    } else if (typeof input[key] !== "string" || input[key].trim() === "") {
      fields[key] = `${label} must be a non-empty string`;
    } else {
      clean[key] = input[key].trim();
    }
  }

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

  if (Object.keys(fields).length > 0) {
    throw new HttpError(400, "Validation failed", fields);
  }
  return clean;
}

// turns the :id text from the URL into a number, or returns 400.
export function parseId(raw) {
  if (!/^[1-9]\d*$/.test(raw)) throw new HttpError(400, "Invalid id");
  return Number(raw);
}

export function listAssignments(status) {
  if (status === undefined) return store.getAll();
  if (status === "active") return store.getAll().filter((a) => !a.completed);
  if (status === "completed") return store.getAll().filter((a) => a.completed);
  throw new HttpError(400, "status must be 'active' or 'completed'");
}

export function getAssignment(id) {
  const assignment = store.getById(id);
  if (!assignment) throw new HttpError(404, "Assignment not found");
  return assignment;
}

export function createAssignment(body) {
  const clean = validateFields(body ?? {}, { requireAll: true });
  return store.insert({ completed: false, ...clean });
}

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

export function deleteAssignment(id) {
  getAssignment(id); // throws 404 if it doesn't exist
  store.remove(id);
}