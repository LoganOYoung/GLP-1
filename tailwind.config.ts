import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 方案五：清新医疗 (Fresh Medical)
        // Primary (45%) - Sky Blue
        primary: {
          DEFAULT: '#0EA5E9', // Sky Blue 500 - 主要CTA、导航、品牌元素
          50: '#F0F9FF',
          100: '#E0F2FE', // 背景
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8', // hover状态
          500: '#0EA5E9', // DEFAULT
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        // Secondary (40%) - Emerald
        secondary: {
          DEFAULT: '#10B981', // Emerald 500 - 健康、节省、成功
          50: '#ECFDF5',
          100: '#D1FAE5', // 背景
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399', // hover状态
          500: '#10B981', // DEFAULT
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        // Accent (15%) - Teal, Amber, Red
        accent: {
          teal: {
            DEFAULT: '#14B8A6', // 数据可视化、特殊功能
            50: '#F0FDFA',
            100: '#CCFBF1',
            200: '#99F6E4',
            300: '#5EEAD4',
            400: '#2DD4BF',
            500: '#14B8A6',
            600: '#0D9488',
            700: '#0F766E',
          },
          amber: {
            DEFAULT: '#F59E0B', // 警告
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
          },
          red: {
            DEFAULT: '#EF4444', // 错误、危险
            50: '#FEF2F2',
            100: '#FEE2E2',
            200: '#FECACA',
            300: '#FCA5A5',
            400: '#F87171',
            500: '#EF4444',
            600: '#DC2626',
            700: '#B91C1C',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'primary': '0 4px 6px -1px rgba(14, 165, 233, 0.1), 0 2px 4px -1px rgba(14, 165, 233, 0.06)',
        'primary-lg': '0 10px 15px -3px rgba(14, 165, 233, 0.1), 0 4px 6px -2px rgba(14, 165, 233, 0.05)',
        'secondary': '0 4px 6px -1px rgba(16, 185, 129, 0.1), 0 2px 4px -1px rgba(16, 185, 129, 0.06)',
        'secondary-lg': '0 10px 15px -3px rgba(16, 185, 129, 0.1), 0 4px 6px -2px rgba(16, 185, 129, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
