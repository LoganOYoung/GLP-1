'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  fallback?: 'gradient' | 'icon';
}

function FallbackView({
  alt,
  width,
  height,
  className,
  fallback,
}: {
  alt: string;
  width: number;
  height: number;
  className: string;
  fallback: 'gradient' | 'icon';
}) {
  if (fallback === 'icon') {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ width, height }}
      >
        <ImageIcon className="h-8 w-8 text-gray-400" />
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-primary-100 via-white to-secondary-100 ${className}`}
      style={{ width, height }}
    >
      <div className="text-center p-4">
        <div className="text-4xl mb-2">📷</div>
        <p className="text-xs text-gray-600 font-medium">{alt}</p>
      </div>
    </div>
  );
}

export default function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fallback = 'gradient',
}: ImagePlaceholderProps) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        onError={() => setFailed(true)}
      />
    );
  }

  return <FallbackView alt={alt} width={width} height={height} className={className} fallback={fallback} />;
}
