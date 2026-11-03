import express from "express";
import assignmentRoutes from "./routes/assignments.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json()); // parses JSON request bodies

app.use("/api/assignments", assignmentRoutes);

app.use(notFoundHandler); // order matters: after the routes...
app.use(errorHandler); // ...and the error handler goes last

export default app;