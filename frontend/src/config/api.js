// NEXT_PUBLIC_ variables are read at build time, not run time.
// Changing this in production needs a rebuild to take effect.
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

export async function apiRequest(path, options = {}) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    method: options.method || "GET",
    headers: options.body ? { "Content-Type": "application/json" } : {},
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  // A crashed server can return an html error page, and calling
  // response.json() on html throws a misleading error.
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("Server is not responding correctly. Please try again.");
  }

  const payload = await response.json();

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Something went wrong");
  }

  return payload.data;
}
