// A custom error class so controllers can throw errors with an HTTP status code.
// Example: throw new ApiError(404, "Inquiry not found")
class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
