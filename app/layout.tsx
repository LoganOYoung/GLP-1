import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SkipLinks from '@/components/SkipLinks';
import BackToTop from '@/components/BackToTop';
import ReadingProgress from '@/components/ReadingProgress';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-LTDPD4FYZ4';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const SITE_URL = 'https://www.rxlikewise.com';
const DEFAULT_DESCRIPTION =
  'GLP-1 cost: $0–$50/mo with insurance; $150–$350 compounded. Compare Ozempic, Wegovy, Mounjaro; check legitimacy & shortage. Rx Likewise.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Rx Likewise | Same results, smarter choices',
    template: '%s | Rx Likewise',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: 'GLP-1, Ozempic, Wegovy, Mounjaro, semaglutide, cost, insurance, shortage, compounded, legitimacy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Rx Likewise',
    title: 'Rx Likewise | Same results, smarter choices',
    description: DEFAULT_DESCRIPTION,
    images: [{ url: '/images/logos/logo.png', width: 512, height: 512, alt: 'Rx Likewise – GLP-1 cost and alternatives' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rx Likewise | Same results, smarter choices',
    description: DEFAULT_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/images/logos/favicon.png',
    apple: '/images/logos/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 使用 link 加载字体，避免 next/font 在开发环境网络异常时导致 SSR 失败、全站空白。App Router 在 layout 中加载字体即可。 */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router: fonts in root layout are correct */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        {/* 必须在所有脚本前执行：pathname 为空时立即重定向到 /，避免客户端路由误判为 404 导致空白 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=document.location.pathname;if(!p||p===''){document.location.replace(document.location.origin+'/');}})();`,
          }}
        />
      </head>
      <body className="min-h-screen min-w-0 flex flex-col bg-gray-50 text-gray-900 font-sans antialiased overflow-x-hidden">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <SkipLinks />
        {/* 全站极淡噪点纹理，增强层次、不干扰阅读 */}
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
          aria-hidden
        >
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="site-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" result="n" />
              <feColorMatrix in="n" type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#site-noise)" />
          </svg>
        </div>
        <ReadingProgress />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
