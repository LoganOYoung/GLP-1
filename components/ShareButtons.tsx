'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export default function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: fullUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
  };

  const hasNativeShare = typeof navigator !== 'undefined' && 'share' in navigator;

  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-gray-200 pt-4">
      <span className="text-sm font-medium text-gray-700">Share:</span>
      {hasNativeShare && (
        <button
          onClick={handleShare}
          className="text-sm text-primary-600 hover:text-primary-700 underline"
        >
          Share via...
        </button>
      )}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-primary-600 hover:text-primary-700 underline"
      >
        Twitter
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-primary-600 hover:text-primary-700 underline"
      >
        Facebook
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-primary-600 hover:text-primary-700 underline"
      >
        LinkedIn
      </a>
      <button
        onClick={handleCopy}
        className="text-sm text-primary-600 hover:text-primary-700 underline"
      >
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  );
}
