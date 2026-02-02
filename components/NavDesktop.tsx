'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { NAV_GROUPS, CTA_LABEL, CTA_HREF, type NavGroup } from '@/lib/nav-config';

export default function NavDesktop() {
  const [activeDropdown, setActiveDropdown] = useState<NavGroup['id'] | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <div
      ref={navRef}
      className="flex flex-wrap items-center justify-end gap-0.5 sm:gap-1"
    >
      {/* 一级菜单下拉（含 Legal）；FAQ 搜索在 Resources → FAQ + 页内搜索 */}
      {NAV_GROUPS.map((group, index) => {
        const isRightAligned = index >= NAV_GROUPS.length - 2; // Resources, Legal 下拉靠右对齐，避免溢出
        return (
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
            className={`flex items-center gap-1 rounded-none px-2 py-1.5 text-sm font-medium leading-tight transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-1 lg:px-2.5 lg:py-2 ${
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
              className={`absolute top-full z-50 mt-0.5 min-w-[200px] rounded-none border border-gray-200 bg-white py-1 shadow-xl ${isRightAligned ? 'right-0 left-auto' : 'left-0'}`}
            >
              {group.links.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  role="menuitem"
                  className="block px-4 py-2.5 text-sm leading-tight text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700 focus-visible:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400"
                  onClick={() => setActiveDropdown(null)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ); })}

      {/* CTA: Find Your Option */}
      <Link
        href={CTA_HREF}
        className="ml-1 shrink-0 rounded-none bg-primary-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-600 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 lg:px-3 lg:py-2"
      >
        {CTA_LABEL}
      </Link>
    </div>
  );
}
