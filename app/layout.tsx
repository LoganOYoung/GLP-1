import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SkipLinks from '@/components/SkipLinks';
import BackToTop from '@/components/BackToTop';
import ReadingProgress from '@/components/ReadingProgress';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'Rx Likewise | Same results, smarter choices',
    template: '%s | Rx Likewise',
  },
  description:
    'GLP-1 cost: $0–$50/mo with insurance; $150–$350 compounded. Compare Ozempic, Wegovy, Mounjaro; check legitimacy & shortage. Rx Likewise.',
  keywords: 'GLP-1, Ozempic, Wegovy, Mounjaro, semaglutide, cost, insurance, shortage, compounded, legitimacy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
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
        <SkipLinks />
        <ReadingProgress />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
