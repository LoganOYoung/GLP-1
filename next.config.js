/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 仅在生产构建时静态导出，开发时不用 export 避免根路径 404
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'logo.clearbit.com', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;
