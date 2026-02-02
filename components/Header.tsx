import Link from 'next/link';
import ImagePlaceholder from './ImagePlaceholder';
import MobileMenu from './MobileMenu';
import NavDesktop from './NavDesktop';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="container-page flex h-14 min-h-[56px] items-center justify-between gap-2 sm:gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center py-2 min-h-[44px] min-w-[44px] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-none"
          aria-label="Rx Likewise – Home"
        >
          <ImagePlaceholder
            src="/images/logos/logo.png"
            alt=""
            width={120}
            height={32}
            className="h-8 w-auto max-w-[120px] object-contain object-left"
            fallback="icon"
          />
        </Link>
        <nav id="navigation" className="hidden flex-1 justify-end overflow-visible lg:flex min-w-0" aria-label="Main navigation">
          <NavDesktop />
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
