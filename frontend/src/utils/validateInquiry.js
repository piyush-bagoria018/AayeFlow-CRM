// These rules mirror src/models/inquiry.model.js on the backend.
// This check is for fast feedback; the backend check is what protects
// the data, because anyone can skip the browser and call the api.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[0-9+\-\s()]{7,20}$/;

export function validateInquiry(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters";
  } else if (values.fullName.trim().length > 80) {
    errors.fullName = "Full name cannot exceed 80 characters";
  }

  if (!values.companyName.trim()) {
    errors.companyName = "Company name is required";
  } else if (values.companyName.trim().length > 100) {
    errors.companyName = "Company name cannot exceed 100 characters";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please provide a valid email";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!phonePattern.test(values.phone.trim())) {
    errors.phone = "Please provide a valid phone number";
  }

  if (!values.country) {
    errors.country = "Please select a country";
  }

  if (!values.industry) {
    errors.industry = "Please select an industry";
  }

  if (!values.companySize) {
    errors.companySize = "Please select a company size";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  } else if (values.message.trim().length > 1000) {
    errors.message = "Message cannot exceed 1000 characters";
  }

  return errors;
}
