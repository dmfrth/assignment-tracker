const BASE_URL = "/api/assignments"; 

export class ApiError extends Error {
  constructor(status, message, fields) {
    super(message);
    this.status = status; 
    this.fields = fields; 
  }
}

async function request(path = "", options = {}) {
  const { body, ...rest } = options;

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...rest,
      headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body,
    });
  } catch (err) {
    if (err.name === "AbortError") throw err; 
    throw new ApiError(0, "Could not reach the server. Check your connection and try again.");
  }

  
  if (response.status === 204) return null;

  let data = null;
  try {
    data = await response.json();
  } catch {

  }

  
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

export function listAssignments(signal) {
  return request("", { signal });
}

export function getAssignment(id, signal) {
  return request(`/${id}`, { signal });
}

export function createAssignment(data) {
  return request("", { method: "POST", body: JSON.stringify(data) });
}

export function updateAssignment(id, changes) {
  return request(`/${id}`, { method: "PATCH", body: JSON.stringify(changes) });
}

export function deleteAssignment(id) {
  return request(`/${id}`, { method: "DELETE" });
}