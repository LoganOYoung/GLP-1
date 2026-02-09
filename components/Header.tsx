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
          className="flex shrink-0 items-center gap-1.5 py-2 min-h-[44px] min-w-[44px] text-primary-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-none"
          aria-label="Rx Likewise – Home"
        >
          <span className="flex shrink-0 items-center justify-center rounded bg-white">
            <Image
              src="/images/logos/favicon.png"
              alt=""
              width={28}
              height={28}
              className="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
            />
          </span>
          <span className="text-xl font-bold tracking-tight sm:text-2xl">Likewise</span>
        </Link>
        <nav id="navigation" className="hidden flex-1 justify-end overflow-visible lg:flex min-w-0" aria-label="Main navigation">
          <NavDesktop />
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
