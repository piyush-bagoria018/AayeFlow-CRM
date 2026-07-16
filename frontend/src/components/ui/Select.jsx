import { FormField, fieldBaseClasses } from "./FormField";

// A dropdown. "options" is an array of strings, for example
// ["1-10", "11-50"]. The first option is a placeholder that cannot
// be chosen, so the user has to make a real selection.
export function Select({
  label,
  name,
  error,
  required,
  options = [],
  placeholder = "Select an option",
  className = "",
  ...props
}) {
  return (
    <FormField label={label} htmlFor={name} error={error} required={required}>
      <select
        id={name}
        name={name}
        aria-invalid={error ? "true" : "false"}
        className={`${fieldBaseClasses} ${
          error ? "border-danger" : "border-border"
        } ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FormField>
  );
}
