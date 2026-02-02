'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-center text-sm text-gray-600">
        Thanks! We&apos;ll add newsletter signup soon. For now, check our <a href="/faq" className="font-medium text-gray-900 underline hover:no-underline">FAQ</a> and <a href="/about" className="font-medium text-gray-900 underline hover:no-underline">About</a>.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="rounded-none border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 min-w-[200px]"
        required
      />
      <button
        type="submit"
        className="rounded-none bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
      >
        Get updates
      </button>
    </form>
  );
}
