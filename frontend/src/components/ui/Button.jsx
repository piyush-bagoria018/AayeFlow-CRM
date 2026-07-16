import { Spinner } from "./Spinner";

// Navy text on teal, not white: the brand teal is bright and white on it
// fails contrast (1.97:1). Navy gives 6.89:1.
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
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading ? <Spinner /> : null}
      {children}
    </button>
  );
}
