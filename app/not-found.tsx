import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-page section-pad">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-2 text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or was moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-none bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          Back to home
        </Link>
      </div>

      {/* 按角色分流：迷路用户仍可快速选对入口 */}
      <div className="mt-12 border-t border-gray-200 pt-10">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-gray-500">
          Start by your situation
        </h2>
        <p className="mt-1 text-center text-xs text-gray-500">
          Choose the path that fits you.
        </p>
        <ul className="mt-4 flex flex-wrap justify-center gap-3">
          <li>
            <Link
              href="/calculator"
              className="inline-block rounded-none border-2 border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100"
            >
              I have insurance → Check my cost
            </Link>
          </li>
          <li>
            <Link
              href="/alternatives"
              className="inline-block rounded-none border-2 border-secondary-200 bg-secondary-50 px-4 py-2 text-sm font-medium text-secondary-700 hover:bg-secondary-100"
            >
              Uninsured / paying cash → Compare options
            </Link>
          </li>
          <li>
            <Link
              href="/quiz"
              className="inline-block rounded-none border-2 border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Not sure → Find my option
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
