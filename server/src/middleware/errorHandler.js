import { HttpError } from "../errors.js";

// runs when no route matched (e.g. GET /api/itemz).
export function notFoundHandler(req, res) {
  res.status(404).json({
    error: { message: `Route not found: ${req.method} ${req.originalUrl}` },
  });
}

export function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    const error = { message: err.message };
    if (err.fields) error.fields = err.fields;
    return res.status(err.status).json({ error });
  }

  // express.json() throws this when the request body isn't valid JSON
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: { message: "Malformed JSON in request body" } });
  }

  console.error(err);
  res.status(500).json({ error: { message: "Internal server error" } });
}