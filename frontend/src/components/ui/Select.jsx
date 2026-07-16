import { FormField, fieldBaseClasses } from "./FormField";

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
