'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);

      // Find the current section
      const sections = items.map((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          return {
            id: item.id,
            offsetTop: element.offsetTop,
            height: element.offsetHeight,
          };
        }
        return null;
      }).filter(Boolean) as Array<{ id: string; offsetTop: number; height: number }>;

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].offsetTop) {
          setActiveId(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      className={`border border-gray-200 bg-white p-4 transition-all ${
        isSticky ? 'sticky top-20 z-30 shadow-md' : ''
      }`}
      aria-label="Table of contents"
    >
      <h2 className="mb-3 text-sm font-bold text-gray-900">Table of Contents</h2>
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className={`block py-1 transition-colors ${
                item.level === 1
                  ? 'font-medium text-gray-900'
                  : item.level === 2
                    ? 'pl-4 text-gray-700'
                    : 'pl-8 text-gray-600'
              } ${
                activeId === item.id
                  ? 'text-primary-600 font-semibold'
                  : 'hover:text-primary-500'
              }`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  // Update URL without scrolling
                  window.history.pushState(null, '', `#${item.id}`);
                }
              }}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
