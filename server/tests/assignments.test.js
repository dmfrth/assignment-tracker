import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { reset } from "../src/data/assignmentStore.js";

const validAssignment = {
  name: "Lab Report",
  course: "BIO 120",
  dueDate: "2026-12-01",
};


beforeEach(() => {
  reset();
});

describe("GET /api/assignments", () => {
  it("returns 200 and an empty array when there are no assignments", async () => {
    const res = await request(app).get("/api/assignments");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("returns 200 and the stored assignments", async () => {
    await request(app).post("/api/assignments").send(validAssignment);

    const res = await request(app).get("/api/assignments");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe("Lab Report");
  });
});

describe("POST /api/assignments", () => {
  it("returns 201 and the new assignment with an id and completed: false", async () => {
    const res = await request(app).post("/api/assignments").send(validAssignment);

    expect(res.status).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toEqual({ id: 1, ...validAssignment, completed: false });
  });

  it("returns 400 with field errors when the data is invalid", async () => {
    const res = await request(app).post("/api/assignments").send({ name: "" });

    expect(res.status).toBe(400);
    expect(res.body.error.message).toBe("Validation failed");
    expect(res.body.error.fields).toHaveProperty("name");
    expect(res.body.error.fields).toHaveProperty("course");
    expect(res.body.error.fields).toHaveProperty("dueDate");
  });
});

describe("GET /api/assignments/:id", () => {
  it("returns 404 with the error shape when the assignment does not exist", async () => {
    const res = await request(app).get("/api/assignments/99");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: { message: "Assignment not found" } });
  });
});

describe("PATCH /api/assignments/:id", () => {
  it("returns 200 and the updated assignment", async () => {
    await request(app).post("/api/assignments").send(validAssignment);

    const res = await request(app).patch("/api/assignments/1").send({ completed: true });

    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
    expect(res.body.name).toBe("Lab Report"); 
  });
});

describe("DELETE /api/assignments/:id", () => {
  it("returns 204 with no body, and the assignment is gone afterward", async () => {
    await request(app).post("/api/assignments").send(validAssignment);

    const deleteRes = await request(app).delete("/api/assignments/1");
    expect(deleteRes.status).toBe(204);
    expect(deleteRes.body).toEqual({});

    const getRes = await request(app).get("/api/assignments/1");
    expect(getRes.status).toBe(404);
  });
});