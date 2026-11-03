// calls fetch(), every function returns something that either gives back data or fails and sends an ApiError message

// this is the default path that all requests go through, vite forwards the requests to the express server
const BASE_URL = "/api/assignments"; 

// error for a failed api call
// carries the status code and field messages if the server sent them
export class ApiError extends Error {
  constructor(status, message, fields) {
    super(message);
    this.status = status;  // http status
    this.fields = fields;  // per-field validation messages
  }
}

// "helper" that every function will use to talk to the server
// path: what to add to the base url
// options: the method, body, etc.
async function request(path = "", options = {}) {
  const { body, ...rest } = options;

  // send the request. if it fails, the server cannot be reached at all
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...rest,
      // only requests that send a body need to say the body is json
      headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body,
    });
  } catch (err) {
    if (err.name === "AbortError") throw err; // a cancelled request is not an error to show the user
    throw new ApiError(0, "Could not reach the server. Check your connection and try again.");
  }

  // 204 (No Content) has no body to delete, meanining a successful delete
  if (response.status === 204) return null;

  // read the json body. if there isn't one, data will stay null
  let data = null;
  try {
    data = await response.json();
  } catch {
    // the response had no json body
  }

  // decide success or failure depending on the status code
  // response.ok is true for status codes 200-299
  if (!response.ok) {
    const message =
      data?.error?.message ??
      (response.status >= 500
        ? "The server is unavailable or had a problem. Please try again."
        : `Request failed (${response.status}).`);
    throw new ApiError(response.status, message, data?.error?.fields);
  }

  return data;
}

// GET all assignments
export function listAssignments(signal) {
  return request("", { signal });
}

// GET one assignment by id
export function getAssignment(id, signal) {
  return request(`/${id}`, { signal });
}

// POST a new assignment, returns the created assignment with the new id
export function createAssignment(data) {
  return request("", { method: "POST", body: JSON.stringify(data) });
}

// PATCH an assignment, only the fields in 'changes' are updated
export function updateAssignment(id, changes) {
  return request(`/${id}`, { method: "PATCH", body: JSON.stringify(changes) });
}

// DELETE an assignment, returns null on success
export function deleteAssignment(id) {
  return request(`/${id}`, { method: "DELETE" });
}