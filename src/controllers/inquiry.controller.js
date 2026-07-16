import mongoose from "mongoose";
import Inquiry from "../models/inquiry.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// POST /api/inquiry
export const createInquiry = asyncHandler(async (req, res) => {
  const { fullName, companyName, email, phone, country, industry, companySize, message } =
    req.body;

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

// GET /api/inquiry?search=&industry=&companySize=
export const getInquiries = asyncHandler(async (req, res) => {
  const { search, industry, companySize } = req.query;

  const filter = {};

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

  const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 }).lean();

  res.status(200).json(new ApiResponse(200, inquiries, "Inquiries fetched successfully"));
});

// DELETE /api/inquiry/:id
export const deleteInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Without this check, an id like "abc" throws a confusing cast error.
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid inquiry id");
  }

  const inquiry = await Inquiry.findByIdAndDelete(id);

  if (!inquiry) {
    throw new ApiError(404, "Inquiry not found");
  }

  res.status(200).json(new ApiResponse(200, inquiry, "Inquiry deleted successfully"));
});
