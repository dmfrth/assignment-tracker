import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { reset } from "../src/data/assignmentStore.js";

// these tests will help us check the API routes against the API contract we made

// valid assignment that several tests reuse
const validAssignment = {
  name: "Lab Report",
  course: "BIO 120",
  dueDate: "2026-12-01",
};

// before each test, empty the data store so tests can't affect each other
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
    // creates one assignment first, then checks that it shows up in the list
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
    expect(res.headers["content-type"]).toMatch(/json/); // response is json
    // the server added the id and set completed to false
    expect(res.body).toEqual({ id: 1, ...validAssignment, completed: false });
  });

  it("returns 400 with field errors when the data is invalid", async () => {
    // an empty name and no course or dueDate value will fail validation
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

    // send only the field we want to change
    const res = await request(app).patch("/api/assignments/1").send({ completed: true });

    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
    expect(res.body.name).toBe("Lab Report"); // other fields left untouched
  });
});

describe("DELETE /api/assignments/:id", () => {
  it("returns 204 with no body, and the assignment is gone afterward", async () => {
    await request(app).post("/api/assignments").send(validAssignment);

    const deleteRes = await request(app).delete("/api/assignments/1");
    expect(deleteRes.status).toBe(204);
    expect(deleteRes.body).toEqual({}); // 204 means there is no response body

    // asking for the deleted assignment should return a 404 error
    const getRes = await request(app).get("/api/assignments/1");
    expect(getRes.status).toBe(404);
  });
});