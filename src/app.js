import express from "express";
import cors from "cors";

import inquiryRouter from "./routes/inquiry.routes.js";

const app = express();

// Allow the frontend (running on a different port) to call this API.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Read JSON request bodies.
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Simple health check - useful to confirm the server is alive.
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "AayeFlow API is running" });
});

// Routes
app.use("/api/inquiry", inquiryRouter);

// 404 handler - runs when no route above matched.
app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    data: null,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    success: false,
  });
});

// Global error handler - every error thrown in a controller ends up here,
// so error responses have the same shape as success responses.
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];

  // Mongoose validation errors are not ApiErrors, so they would default to 500.
  // A bad request is the client's fault, so we report it as 400 with the
  // list of field messages.
  if (err.name === "ValidationError") {
    statusCode = 400;
    errors = Object.values(err.errors).map((e) => e.message);
    message = "Validation failed";
  }

  res.status(statusCode).json({
    statusCode,
    data: null,
    message,
    errors,
    success: false,
  });
});

export { app };
