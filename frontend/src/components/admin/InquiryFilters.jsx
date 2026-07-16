import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { industries, companySizes } from "@/data/formOptions";

// The search box and the two dropdowns.
// This component holds no state of its own - the admin page owns the
// filter values and passes them down, which keeps one source of truth.
export function InquiryFilters({ filters, onChange, onClear, hasFilters }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Input
          label="Search"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Name, company or email"
        />
        <Select
          label="Industry"
          name="industry"
          value={filters.industry}
          onChange={handleChange}
          options={industries}
          placeholder="All industries"
        />
        <Select
          label="Company Size"
          name="companySize"
          value={filters.companySize}
          onChange={handleChange}
          options={companySizes}
          placeholder="All sizes"
        />
      </div>

      {/* Only offer "clear" when there is something to clear. */}
      {hasFilters ? (
        <div className="mt-4">
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear filters
          </Button>
        </div>
      ) : null}
    </div>
  );
}
