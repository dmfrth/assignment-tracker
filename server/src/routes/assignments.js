import { Router } from "express";
import * as service from "../services/assignmentService.js";

// this portion deals with which url method was used, which service function to call, and which status code to return
// any errors thrown by the service (where the logic lives) are caught by the error handler in app.js

const router = Router();

// GET /api/assignments
// returns the list of assignments, status 200
router.get("/", (req, res) => {
  res.status(200).json(service.listAssignments(req.query.status));
});

// GET /api/assignments/:id
// returns one assignment, status 200
router.get("/:id", (req, res) => {
  const id = service.parseId(req.params.id);
  res.status(200).json(service.getAssignment(id));
});

// POST /api/assignments
// creates an assignment from the json body, status 201 (created)
router.post("/", (req, res) => {
  const created = service.createAssignment(req.body);
  res.status(201).json(created);
});

// PATCH /api/assignments/:id
// updates only the fields sent in the body and returns the updated assignment (edits), status 200
router.patch("/:id", (req, res) => {
  const id = service.parseId(req.params.id);
  res.status(200).json(service.updateAssignment(id, req.body));
});

// DELETE /api/assignments/:id
// deletes the assignment, status 204
router.delete("/:id", (req, res) => {
  const id = service.parseId(req.params.id);
  service.deleteAssignment(id);
  res.status(204).end();
});

export default router;