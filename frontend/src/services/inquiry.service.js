import { apiRequest } from "@/config/api";

// All inquiry api calls live here.
// Components call these functions and never call fetch themselves,
// so if an endpoint ever changes we only edit this file.

// POST /api/inquiry
export async function createInquiry(inquiry) {
  return apiRequest("/inquiry", {
    method: "POST",
    body: inquiry,
  });
}

// GET /api/inquiry  (optionally with ?search= &industry= &companySize=)
export async function getInquiries(filters = {}) {
  // URLSearchParams builds the query string for us and escapes special
  // characters, so a search for "A&B Ltd" does not break the url.
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.industry && filters.industry !== "all") {
    params.set("industry", filters.industry);
  }
  if (filters.companySize && filters.companySize !== "all") {
    params.set("companySize", filters.companySize);
  }

  const query = params.toString();
  return apiRequest(query ? `/inquiry?${query}` : "/inquiry");
}

// DELETE /api/inquiry/:id
export async function deleteInquiry(id) {
  return apiRequest(`/inquiry/${id}`, {
    method: "DELETE",
  });
}
