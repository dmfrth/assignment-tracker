import express from "express";
import assignmentRoutes from "./routes/assignments.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

// this is where we build the express app, but index.js is where it actually starts listening on a port

const app = express();

app.use(express.json()); // reads json response bodies and puts them in req.body

// every url starting with /api/assignments is handled by the assignment routes
app.use("/api/assignments", assignmentRoutes);

app.use(notFoundHandler); // catches any url that no route matched
app.use(errorHandler); // catches errors and turns them into json

export default app;