import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Out-of-Pocket Calculator',
  description: 'Estimate your real cost for GLP-1 medications with insurance, discount cards, and options.',
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
