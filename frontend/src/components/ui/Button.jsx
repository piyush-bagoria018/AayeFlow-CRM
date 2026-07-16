import { Spinner } from "./Spinner";

// The colour choices are kept in objects so the JSX below stays readable
// and every button on the site can only use an approved combination.
//
// Note: our brand teal is bright, so white text on it is hard to read.
// Navy text on teal is used instead, which is both on brand and readable.
const variantClasses = {
  primary: "bg-primary text-navy hover:bg-primary-strong",
  secondary: "bg-navy text-white hover:bg-navy-strong",
  outline: "border border-border bg-surface text-foreground hover:bg-background",
  ghost: "text-foreground hover:bg-border/50",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  isLoading = false,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      // A loading button must not be clickable twice.
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading ? <Spinner /> : null}
      {children}
    </button>
  );
}
