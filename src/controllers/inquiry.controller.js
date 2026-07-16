import mongoose from "mongoose";
import Inquiry from "../models/inquiry.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// POST /api/inquiry - save a new inquiry
export const createInquiry = asyncHandler(async (req, res) => {
  const { fullName, companyName, email, phone, country, industry, companySize, message } =
    req.body;

  // Mongoose checks the details (valid email, length, etc).
  // This only catches empty or missing fields early.
  // !field catches undefined/null, .trim() catches spaces-only values.
  if (
    [fullName, companyName, email, phone, country, industry, companySize, message].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const inquiry = await Inquiry.create({
    fullName,
    companyName,
    email,
    phone,
    country,
    industry,
    companySize,
    message,
  });

  res.status(201).json(new ApiResponse(201, inquiry, "Inquiry submitted successfully"));
});

// GET /api/inquiry - get all inquiries (newest first)
// Supports optional ?search= and ?industry= and ?companySize= for the admin dashboard.
export const getInquiries = asyncHandler(async (req, res) => {
  const { search, industry, companySize } = req.query;

  const filter = {};

  // Search across name, company and email.
  if (search && search.trim() !== "") {
    const term = search.trim();
    filter.$or = [
      { fullName: { $regex: term, $options: "i" } },
      { companyName: { $regex: term, $options: "i" } },
      { email: { $regex: term, $options: "i" } },
    ];
  }

  if (industry && industry !== "all") {
    filter.industry = industry;
  }

  if (companySize && companySize !== "all") {
    filter.companySize = companySize;
  }

  // .lean() returns plain objects instead of full mongoose documents.
  // We only read here, so we do not need the extra document methods.
  const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 }).lean();

  res.status(200).json(new ApiResponse(200, inquiries, "Inquiries fetched successfully"));
});

// DELETE /api/inquiry/:id - delete one inquiry
export const deleteInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Without this check, an id like "abc" would throw a confusing cast error.
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid inquiry id");
  }

  const inquiry = await Inquiry.findByIdAndDelete(id);

  if (!inquiry) {
    throw new ApiError(404, "Inquiry not found");
  }

  res.status(200).json(new ApiResponse(200, inquiry, "Inquiry deleted successfully"));
});
