const variantClasses = {
  new: "bg-primary/20 text-accent-strong",
  contacted: "bg-accent/15 text-accent",
  closed: "bg-border text-muted",
};

export function Badge({ variant = "new", children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
        variantClasses[variant] || variantClasses.new
      }`}
    >
      {children}
    </span>
  );
}
