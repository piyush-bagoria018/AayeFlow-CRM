// Wraps an async controller so we don't need try/catch in every one.
// If the controller throws, the error is passed to Express's error handler.
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
