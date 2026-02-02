'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Wallet,
  MapPin,
  FileText,
  Shield,
  Activity,
  FlaskConical,
  Scale,
  GitCompare,
  LayoutList,
  ChevronDown,
  HelpCircle,
  Compass,
  Pill,
  Bell,
  BookOpen,
  BookMarked,
  Search,
} from 'lucide-react';
import { NAV_GROUPS, CTA_LABEL, CTA_HREF } from '@/lib/nav-config';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  Wallet,
  MapPin,
  FileText,
  Shield,
  Activity,
  FlaskConical,
  Scale,
  GitCompare,
  LayoutList,
  HelpCircle,
  Compass,
  Pill,
  Bell,
  BookOpen,
  BookMarked,
};

function NavIcon({ name }: { name?: string }) {
  const Icon = name ? ICON_MAP[name] : null;
  if (!Icon) return null;
  return <Icon className="h-4 w-4 shrink-0 text-gray-500" />;
}

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const close = () => {
    setIsOpen(false);
    setOpenGroup(null);
  };

  const toggleGroup = (id: string) => {
    setOpenGroup((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-11 w-11 min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1.5 rounded-md p-2 lg:hidden touch-manipulation transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span
          className={`block h-0.5 w-5 rounded-full bg-gray-700 transition-all duration-200 ease-out ${
            isOpen ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-5 rounded-full bg-gray-700 transition-all duration-200 ease-out ${
            isOpen ? 'scale-x-0 opacity-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-5 rounded-full bg-gray-700 transition-all duration-200 ease-out ${
            isOpen ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={close}
            aria-hidden="true"
          />
          <nav
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl lg:hidden"
            id="navigation-drawer"
            aria-label="Main navigation"
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 px-4">
              <span className="text-base font-semibold text-gray-900">Menu</span>
              <button
                onClick={close}
                className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-md transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-400"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              {/* Home + Search */}
              <div className="border-b border-gray-100 px-4 pb-3">
                <Link
                  href="/"
                  onClick={close}
                  className="block rounded-lg px-3 py-3 min-h-[44px] flex items-center text-sm font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600 focus-visible:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400"
                >
                  Home
                </Link>
                <Link
                  href="/faq"
                  onClick={close}
                  className="mt-0.5 flex items-center gap-2 rounded-lg px-3 py-3 min-h-[44px] text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 focus-visible:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400"
                >
                  <Search className="h-4 w-4 shrink-0" aria-hidden />
                  Search (FAQ)
                </Link>
              </div>

              {/* 6 个一级菜单：手风琴 */}
              {NAV_GROUPS.map((group) => (
                <div key={group.id} className="border-b border-gray-100">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    className="flex w-full min-h-[44px] items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400"
                    aria-expanded={openGroup === group.id}
                  >
                    {group.label}
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 ${
                        openGroup === group.id ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                      openGroup === group.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="bg-gray-50/50 pb-2 pl-4 pr-4 pt-0.5">
                        {group.links.map((link) => (
                          <Link
                            key={`${link.href}-${link.label}`}
                            href={link.href}
                            onClick={close}
                            className="flex items-center gap-2 rounded-lg px-3 py-3 min-h-[44px] text-sm text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-600 focus-visible:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400"
                          >
                            <NavIcon name={link.icon} />
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* CTA */}
              <div className="mt-4 px-4">
                <Link
                  href={CTA_HREF}
                  onClick={close}
                  className="block rounded-lg bg-primary-500 px-4 py-3 min-h-[44px] flex items-center justify-center text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
                >
                  {CTA_LABEL}
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
