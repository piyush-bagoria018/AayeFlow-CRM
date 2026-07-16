// Every successful response uses this shape, so the frontend always
// knows what to expect: { statusCode, data, message, success }
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
