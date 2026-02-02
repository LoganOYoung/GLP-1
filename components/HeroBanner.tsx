'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imagePath?: string;
  imageAlt?: string;
}

export default function HeroBanner({ title, subtitle, imagePath, imageAlt }: HeroBannerProps) {
  const pathname = usePathname();
  
  // 根据路径选择默认图片
  const getDefaultImage = () => {
    if (pathname === '/alternatives') return '/images/banners/alternatives-banner.svg';
    if (pathname === '/calculator') return '/images/banners/calculator-banner.svg';
    if (pathname === '/cost-insurance') return '/images/banners/cost-banner.svg';
    return '/images/banners/home-banner.svg';
  };

  const bannerImage = imagePath || getDefaultImage();
  const altText = imageAlt || `${title} banner`;

  return (
    <div className="relative overflow-hidden rounded-none border-2 border-primary-100 bg-gradient-to-br from-primary-50 via-white to-secondary-50 shadow-lg">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
        {/* Content */}
        <div className="p-8 lg:p-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Image */}
        <div className="relative h-64 lg:h-80">
          {bannerImage.endsWith('.svg') ? (
            // SVG placeholder - 使用渐变背景和图标
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-none bg-white/80 shadow-lg">
                  <span className="text-4xl">💊</span>
                </div>
                <p className="text-sm font-medium text-gray-600">Visual Banner</p>
              </div>
            </div>
          ) : (
            <Image
              src={bannerImage}
              alt={altText}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      </div>
    </div>
  );
}
