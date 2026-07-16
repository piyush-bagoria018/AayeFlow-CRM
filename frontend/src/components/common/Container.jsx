// Keeps content centred with a maximum width and consistent side padding.
// Every section uses this so the whole page lines up on one grid.
export function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
