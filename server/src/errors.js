// this is where our custom error class for problems we want to report to the client will live
// behaves like a normal error but also remembers an HTTP status code like 400, 404, etc.
// the service layer will throw an HttpError, then errorHandler.js will catch it and turn it into a JSON response with the matching status code
export class HttpError extends Error {
  // status: HTTP status code to send back
  // message: description of what went wrong
  // fields: an object that displays like this: { name: "Name is required." } to let the user know what fields are empty / required
  constructor(status, message, fields) {
    super(message); // normal Error class stores the message
    this.status = status;
    this.fields = fields;
  }
}