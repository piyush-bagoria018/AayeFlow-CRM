import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { formatDate } from "@/utils/formatDate";

export function InquiryTable({ inquiries, onDelete, deletingId }) {
  return (
    // A table cannot shrink to phone width, so it scrolls inside this box
    // instead of stretching the whole page.
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full min-w-225 text-left text-sm">
        <thead className="border-b border-border bg-background">
          <tr>
            <th className="px-4 py-3 font-semibold text-foreground">Name</th>
            <th className="px-4 py-3 font-semibold text-foreground">Company</th>
            <th className="px-4 py-3 font-semibold text-foreground">Contact</th>
            <th className="px-4 py-3 font-semibold text-foreground">Industry</th>
            <th className="px-4 py-3 font-semibold text-foreground">Size</th>
            <th className="px-4 py-3 font-semibold text-foreground">Received</th>
            <th className="px-4 py-3 font-semibold text-foreground">Status</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>

        <tbody>
          {inquiries.map((inquiry) => (
            <tr
              key={inquiry._id}
              className="border-b border-border last:border-0 hover:bg-background"
            >
              <td className="px-4 py-3">
                <p className="font-medium text-foreground">{inquiry.fullName}</p>
                <p className="mt-0.5 max-w-xs truncate text-xs text-muted">
                  {inquiry.message}
                </p>
              </td>

              <td className="px-4 py-3 text-foreground">{inquiry.companyName}</td>

              <td className="px-4 py-3">
                <a
                  href={`mailto:${inquiry.email}`}
                  className="text-accent hover:underline"
                >
                  {inquiry.email}
                </a>
                <p className="mt-0.5 text-xs text-muted">{inquiry.phone}</p>
              </td>

              <td className="px-4 py-3 text-muted">{inquiry.industry}</td>
              <td className="px-4 py-3 text-muted">{inquiry.companySize}</td>
              <td className="px-4 py-3 text-muted">{formatDate(inquiry.createdAt)}</td>

              <td className="px-4 py-3">
                <Badge variant={inquiry.status}>{inquiry.status}</Badge>
              </td>

              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onDelete(inquiry)}
                  disabled={deletingId === inquiry._id}
                  className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-danger transition hover:bg-danger/10 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={`Delete inquiry from ${inquiry.fullName}`}
                >
                  {deletingId === inquiry._id ? (
                    <>
                      <Spinner className="h-3 w-3" />
                      Deleting
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
