import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import NavDesktop from './NavDesktop';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="container-page flex h-14 min-h-[56px] items-center justify-between gap-2 sm:gap-4">
        <Link
          href="/"
          className="relative flex shrink-0 items-center py-2 min-h-[44px] min-w-[44px] focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-none"
          aria-label="Rx Likewise – Home"
        >
          <Image
            src="/images/logos/logo.png"
            alt="Rx Likewise"
            width={160}
            height={40}
            className="h-8 w-auto sm:h-9"
            priority
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
