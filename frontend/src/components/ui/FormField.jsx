// Every form control needs the same three things: a label, the control
// itself, and an error message under it. That wrapper lives here so
// Input, Select and Textarea do not repeat it.
export function FormField({ label, htmlFor, error, required, children }) {
  return (
    <div className="w-full">
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </label>

      {children}

      {error ? <p className="mt-1.5 text-sm text-danger">{error}</p> : null}
    </div>
  );
}

// Shared look for the input, select and textarea boxes.
// Kept in one place so all form controls stay visually identical.
export const fieldBaseClasses =
  "w-full rounded-md border bg-surface px-3 py-2.5 text-sm text-foreground placeholder:text-muted transition focus:border-accent disabled:cursor-not-allowed disabled:opacity-60";
