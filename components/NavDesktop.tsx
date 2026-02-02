'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { NAV_GROUPS, CTA_LABEL, CTA_HREF, type NavGroup } from '@/lib/nav-config';

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
  return <Icon className="h-4 w-4 shrink-0 text-gray-500" aria-hidden />;
}

export default function NavDesktop() {
  const [activeDropdown, setActiveDropdown] = useState<NavGroup['id'] | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDropdown(null);
    };
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveDropdown(null);
    };
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOutside);
    return () => {
      clearCloseTimeout();
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    if (q) router.push(`/faq?q=${encodeURIComponent(q)}`);
    else router.push('/faq');
    setActiveDropdown(null);
  };

  return (
    <div
      ref={navRef}
      className="flex flex-wrap items-center justify-end gap-0.5 sm:gap-1"
    >
      {/* 全局搜索：提交后跳 FAQ 并带 q 参数 */}
      <form onSubmit={handleSearch} className="hidden items-center sm:flex">
        <label htmlFor="nav-search" className="sr-only">Search FAQ</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden />
          <input
            id="nav-search"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search FAQ"
            className="w-28 rounded-md border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-2 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-400/30 sm:w-36 md:w-40"
          />
        </div>
        <button type="submit" className="sr-only">Search</button>
      </form>
      {/* 6 个一级菜单下拉 */}
      {NAV_GROUPS.map((group) => (
        <div
          key={group.id}
          className="relative"
          onMouseEnter={clearCloseTimeout}
          onMouseLeave={scheduleClose}
        >
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === group.id ? null : group.id)}
            onMouseEnter={() => { clearCloseTimeout(); setActiveDropdown(group.id); }}
            className={`flex items-center gap-1 rounded-md px-2.5 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-1 sm:px-3 ${
              activeDropdown === group.id
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
            }`}
            aria-expanded={activeDropdown === group.id}
            aria-haspopup="true"
            aria-controls={`nav-menu-${group.id}`}
            id={`nav-trigger-${group.id}`}
          >
            {group.label}
            <ChevronDown
              className={`h-4 w-4 shrink-0 transition-transform duration-150 ${
                activeDropdown === group.id ? 'rotate-180' : ''
              }`}
              aria-hidden
            />
          </button>
          {activeDropdown === group.id && (
            <div
              id={`nav-menu-${group.id}`}
              role="menu"
              aria-labelledby={`nav-trigger-${group.id}`}
              className="absolute left-0 top-full z-50 mt-0.5 min-w-[200px] rounded-lg border border-gray-200 bg-white py-1 shadow-xl"
            >
              {group.links.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  role="menuitem"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700 focus-visible:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400"
                  onClick={() => setActiveDropdown(null)}
                >
                  <NavIcon name={link.icon} />
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* CTA: Find Your Option */}
      <Link
        href={CTA_HREF}
        className="ml-1 rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 sm:px-4"
      >
        {CTA_LABEL}
      </Link>
    </div>
  );
}
