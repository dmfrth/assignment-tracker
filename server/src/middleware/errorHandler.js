import { HttpError } from "../errors.js";

// runs when no route matched (e.g. GET /api/itemz).
// send a 404 error in the same format as every other error

export function notFoundHandler(req, res) {
  res.status(404).json({
    error: { message: `Route not found: ${req.method} ${req.originalUrl}` },
  });
}

// this will run any time an error is thrown while handling a request
// turns every kind of error into a json response with the appropriate status code
export function errorHandler(err, req, res, next) {
  // errors we tried on purpose sent back the appropriate codes and status messages we chose
  if (err instanceof HttpError) {
    const error = { message: err.message };
    if (err.fields) error.fields = err.fields;
    return res.status(err.status).json({ error });
  }

  // express.json() throws this when the request body isn't valid json
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: { message: "Malformed JSON in request body" } });
  }

  // any other type of error is unexpected, so throw a 500 code
  console.error(err);
  res.status(500).json({ error: { message: "Internal server error" } });
}