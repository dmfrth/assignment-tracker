import { Router } from "express";
import * as service from "../services/assignmentService.js";

const router = Router();

// GET /api/assignments
router.get("/", (req, res) => {
  res.status(200).json(service.listAssignments(req.query.status));
});

// GET /api/assignments/:id
router.get("/:id", (req, res) => {
  const id = service.parseId(req.params.id);
  res.status(200).json(service.getAssignment(id));
});

// POST /api/assignments
router.post("/", (req, res) => {
  const created = service.createAssignment(req.body);
  res.status(201).json(created);
});

// PATCH /api/assignments/:id
router.patch("/:id", (req, res) => {
  const id = service.parseId(req.params.id);
  res.status(200).json(service.updateAssignment(id, req.body));
});

// DELETE /api/assignments/:id
router.delete("/:id", (req, res) => {
  const id = service.parseId(req.params.id);
  service.deleteAssignment(id);
  res.status(204).end();
});

export default router;