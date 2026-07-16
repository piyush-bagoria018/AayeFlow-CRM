// Turns the createdAt string from mongodb ("2026-07-16T10:30:00.000Z")
// into something readable like "16 Jul 2026, 10:30 am".
export function formatDate(value) {
  if (!value) return "-";

  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
