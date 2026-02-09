export default function SkipLinks() {
  return (
    <div className="sr-only">
      <a
        href="#main-content"
        className="bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-colors focus:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="ml-2 bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-colors focus:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Skip to navigation
      </a>
    </div>
  );
}
