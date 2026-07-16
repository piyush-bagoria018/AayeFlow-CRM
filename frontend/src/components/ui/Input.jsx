import { FormField, fieldBaseClasses } from "./FormField";

export function Input({ label, name, error, required, className = "", ...props }) {
  return (
    <FormField label={label} htmlFor={name} error={error} required={required}>
      <input
        id={name}
        name={name}
        aria-invalid={error ? "true" : "false"}
        className={`${fieldBaseClasses} ${
          error ? "border-danger" : "border-border"
        } ${className}`}
        {...props}
      />
    </FormField>
  );
}
