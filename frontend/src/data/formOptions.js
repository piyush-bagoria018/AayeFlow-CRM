// Dropdown options for the inquiry form.

// IMPORTANT: these values must match the enum in the backend model
// (src/models/inquiry.model.js). If they drift apart, the form will
// look fine but the api will reject the submission.
export const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"];

export const industries = [
  "Banking & Finance",
  "Education",
  "Healthcare",
  "Information Technology",
  "Logistics",
  "Manufacturing",
  "Real Estate",
  "Retail & E-commerce",
  "Travel & Hospitality",
  "Other",
];

// India first because that is our main market, then the rest A-Z.
export const countries = [
  "India",
  "Australia",
  "Bangladesh",
  "Canada",
  "France",
  "Germany",
  "Indonesia",
  "Japan",
  "Malaysia",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Philippines",
  "Singapore",
  "South Africa",
  "Sri Lanka",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Vietnam",
  "Other",
];
