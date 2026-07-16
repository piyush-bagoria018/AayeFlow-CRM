import express from "express";
import cors from "cors";

import inquiryRouter from "./routes/inquiry.routes.js";

const app = express();

// CORS_ORIGIN can hold more than one url separated by commas, for example:
//   CORS_ORIGIN=https://aayeflow.tech,https://aaye-flow-crm.vercel.app
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "AayeFlow API is running" });
});

app.use("/api/inquiry", inquiryRouter);

app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    data: null,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    success: false,
  });
});

// Global error handler. Every error thrown in a controller ends up here.
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];

  // Mongoose validation errors are not ApiErrors, so they would default to 500.
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
