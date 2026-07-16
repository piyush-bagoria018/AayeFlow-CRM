import { FormField, fieldBaseClasses } from "./FormField";

// A single text input with its label and error message.
// "...props" passes anything else (value, onChange, placeholder, type)
// straight to the real <input>, so this component does not need to
// know about every attribute in advance.
export function Input({ label, name, error, required, className = "", ...props }) {
  return (
    <FormField label={label} htmlFor={name} error={error} required={required}>
      <input
        id={name}
        name={name}
        // Tells screen readers this field is invalid.
        aria-invalid={error ? "true" : "false"}
        className={`${fieldBaseClasses} ${
          error ? "border-danger" : "border-border"
        } ${className}`}
        {...props}
      />
    </FormField>
  );
}
