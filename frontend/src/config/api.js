// Base url of the backend. Set in .env.local so it can point at the
// deployed api in production without changing any code.
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api"
).replace(/\/+$/, ""); // remove any trailing slash so we never build "//inquiry"

/**
 * One place where every request to our backend goes through.
 *
 * The backend always replies with the same shape:
 *   { statusCode, data, message, success }
 *
 * So this function does the repetitive part:
 *  - builds the full url
 *  - sends json
 *  - throws if the request failed, using the backend's own message
 *  - returns only the "data" part, because that is all a component needs
 */
export async function apiRequest(path, options = {}) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    method: options.method || "GET",
    headers: options.body ? { "Content-Type": "application/json" } : {},
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store", // always fetch fresh data, never a cached copy
  });

  // If the server is down or crashes, it can return an html error page.
  // Calling response.json() on html throws a confusing error, so we check first.
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("Server is not responding correctly. Please try again.");
  }

  const payload = await response.json();

  // Our backend sets success:false on errors and puts the reason in message.
  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Something went wrong");
  }

  return payload.data;
}
