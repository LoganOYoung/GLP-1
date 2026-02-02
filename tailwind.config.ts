import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 绿色主题：主色与辅色均为绿色系，仅保留琥珀/红用于警告与错误
        primary: {
          DEFAULT: '#059669', // Emerald 600 - CTA、导航、链接
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669', // DEFAULT
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        secondary: {
          DEFAULT: '#047857', // 略深绿，用于 hover/强调
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857', // DEFAULT
          800: '#065F46',
          900: '#064E3B',
        },
        accent: {
          amber: {
            DEFAULT: '#F59E0B',
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
          },
          red: {
            DEFAULT: '#EF4444',
            50: '#FEF2F2',
            100: '#FEE2E2',
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
        'primary': '0 4px 6px -1px rgba(5, 150, 105, 0.1), 0 2px 4px -1px rgba(5, 150, 105, 0.06)',
        'primary-lg': '0 10px 15px -3px rgba(5, 150, 105, 0.1), 0 4px 6px -2px rgba(5, 150, 105, 0.05)',
        'secondary': '0 4px 6px -1px rgba(4, 120, 87, 0.1), 0 2px 4px -1px rgba(4, 120, 87, 0.06)',
        'secondary-lg': '0 10px 15px -3px rgba(4, 120, 87, 0.1), 0 4px 6px -2px rgba(4, 120, 87, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
