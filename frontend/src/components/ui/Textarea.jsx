import { FormField, fieldBaseClasses } from "./FormField";

export function Textarea({
  label,
  name,
  error,
  required,
  rows = 4,
  className = "",
  ...props
}) {
  return (
    <FormField label={label} htmlFor={name} error={error} required={required}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        aria-invalid={error ? "true" : "false"}
        className={`${fieldBaseClasses} resize-y ${
          error ? "border-danger" : "border-border"
        } ${className}`}
        {...props}
      />
    </FormField>
  );
}
