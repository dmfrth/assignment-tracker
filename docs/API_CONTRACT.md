# Assignment Tracker API Contract

Base URL: `/api`
All request and response bodies are JSON

## Resource: Assignment
```json
{ "id": 1, "name": "Essay 2", "course": "ENG 101", "dueDate": "2026-11-15", "completed": false }
```

## Conventions
- Success responses return the resource or an array of resources directly.
- Error responses always use this shape with the matching HTTP code:
  ```json
  { "error": { "message": "Human-readable description" } }
  ```
  Validation errors (400) also include `"fields"`, e.g.
  `{ "error": { "message": "Validation failed", "fields": { "name": "Name is required" } } }`
- The client branches on the status code, not on the body alone.

## Endpoints

### GET /api/assignments
List all assignments. Optional query: `?status=active|completed`.
- **200 OK** → `[ { ...assignment }, ... ]` (empty list is `[]`, still 200)
- **400 Bad Request** (invalid `status` value) → `{ "error": { "message": "status must be 'active' or 'completed'" } }`

### GET /api/assignments/:id
- **200 OK** → `{ ...assignment }`
- **400 Bad Request** (id is not a positive integer) → `{ "error": { "message": "Invalid id" } }`
- **404 Not Found** → `{ "error": { "message": "Assignment not found" } }`

### POST /api/assignments
Request body: `{ "name": "Essay 2", "course": "ENG 101", "dueDate": "2026-11-15" }`
(`completed` is optional and defaults to `false`.)
- **201 Created** → `{ ...assignment }` (includes the new `id`)
- **400 Bad Request** (missing/empty fields, bad date format, malformed JSON) → validation error shape above

### PATCH /api/assignments/:id
Partial update. Body contains any subset of `name`, `course`, `dueDate`, `completed`
(e.g. `{ "completed": true }` for the checkbox, or `{ "name": "Essay 3" }` for the edit form).
- **200 OK** → `{ ...updated assignment }`
- **400 Bad Request** (invalid id, invalid field values, empty body, malformed JSON)
- **404 Not Found** → `{ "error": { "message": "Assignment not found" } }`

### DELETE /api/assignments/:id
- **204 No Content** → empty body
- **400 Bad Request** (invalid id)
- **404 Not Found** → `{ "error": { "message": "Assignment not found" } }`

## Any unexpected server failure
- **500 Internal Server Error** → `{ "error": { "message": "Internal server error" } }`
