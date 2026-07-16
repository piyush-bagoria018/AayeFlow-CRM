import { apiRequest } from "@/config/api";

export async function createInquiry(inquiry) {
  return apiRequest("/inquiry", {
    method: "POST",
    body: inquiry,
  });
}

export async function getInquiries(filters = {}) {
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

export async function deleteInquiry(id) {
  return apiRequest(`/inquiry/${id}`, {
    method: "DELETE",
  });
}
