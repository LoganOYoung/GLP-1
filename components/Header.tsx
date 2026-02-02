import Link from 'next/link';
import ImagePlaceholder from './ImagePlaceholder';
import MobileMenu from './MobileMenu';
import NavDesktop from './NavDesktop';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex h-14 min-h-[3.5rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-lg font-bold text-gray-900 transition-colors hover:text-primary-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md"
        >
          <div className="relative h-8 w-8 shrink-0">
            <ImagePlaceholder
              src="/images/logos/logo.webp"
              alt="Rx Likewise Logo"
              width={32}
              height={32}
              className="object-contain"
              fallback="icon"
            />
          </div>
          <span className="hidden sm:inline">Rx Likewise</span>
        </Link>
        <nav id="navigation" className="hidden flex-1 justify-end overflow-hidden sm:flex md:min-w-0">
          <NavDesktop />
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
