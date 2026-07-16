"use client";

import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { InquiryFilters } from "@/components/admin/InquiryFilters";
import { InquiryTable } from "@/components/admin/InquiryTable";
import { getInquiries, deleteInquiry } from "@/services/inquiry.service";

const emptyFilters = { search: "", industry: "", companySize: "" };

export default function AdminPage() {
  const [inquiries, setInquiries] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);

  // "loading" | "success" | "error"
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  // Holds the id of the row currently being deleted, so only that
  // row shows a spinner instead of the whole table.
  const [deletingId, setDeletingId] = useState(null);

  const hasFilters =
    filters.search !== "" || filters.industry !== "" || filters.companySize !== "";

  // useCallback keeps this function stable between renders, so the
  // effect below does not re-run for no reason.
  const loadInquiries = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      const data = await getInquiries(filters);
      setInquiries(data);
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }, [filters]);

  // Runs when the filters change. The 400ms timer means we wait until
  // the user stops typing before calling the api, instead of firing a
  // request on every keystroke. The cleanup cancels the pending timer.
  useEffect(() => {
    const timer = setTimeout(() => {
      loadInquiries();
    }, 400);

    return () => clearTimeout(timer);
  }, [loadInquiries]);

  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({ ...previous, [name]: value }));
  };

  const handleClearFilters = () => setFilters(emptyFilters);

  const handleDelete = async (inquiry) => {
    const confirmed = window.confirm(
      `Delete the inquiry from ${inquiry.fullName}? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(inquiry._id);

    try {
      await deleteInquiry(inquiry._id);
      // Remove it from the list we already have instead of refetching
      // everything, so the row disappears immediately.
      setInquiries((previous) => previous.filter((item) => item._id !== inquiry._id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="flex-1 py-10">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Inquiries
            </h1>
            <p className="mt-1 text-sm text-muted">
              Every lead captured from the landing page.
            </p>
          </div>

          <Button variant="outline" size="sm" onClick={loadInquiries}>
            Refresh
          </Button>
        </div>

        <div className="mt-6">
          <InquiryFilters
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
            hasFilters={hasFilters}
          />
        </div>

        <div className="mt-6">
          {status === "loading" ? (
            <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-surface py-16 text-sm text-muted">
              <Spinner />
              Loading inquiries...
            </div>
          ) : null}

          {status === "error" ? (
            <div className="rounded-xl border border-danger/40 bg-danger/10 p-8 text-center">
              <p className="text-sm font-medium text-danger">{error}</p>
              <Button variant="outline" className="mt-4" onClick={loadInquiries}>
                Try again
              </Button>
            </div>
          ) : null}

          {status === "success" && inquiries.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface p-12 text-center">
              <p className="font-display text-base font-semibold text-foreground">
                {hasFilters ? "No matching inquiries" : "No inquiries yet"}
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                {hasFilters
                  ? "Try a different search term or clear the filters."
                  : "When someone submits the contact form, their details will appear here."}
              </p>
              {hasFilters ? (
                <Button variant="outline" className="mt-5" onClick={handleClearFilters}>
                  Clear filters
                </Button>
              ) : null}
            </div>
          ) : null}

          {status === "success" && inquiries.length > 0 ? (
            <>
              <p className="mb-3 text-sm text-muted">
                Showing {inquiries.length}{" "}
                {inquiries.length === 1 ? "inquiry" : "inquiries"}
              </p>
              <InquiryTable
                inquiries={inquiries}
                onDelete={handleDelete}
                deletingId={deletingId}
              />
            </>
          ) : null}
        </div>
      </Container>
    </main>
  );
}
