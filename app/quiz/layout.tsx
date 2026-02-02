import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Your Option',
  description: 'Answer a few questions to get personalized GLP-1 options based on budget and preference.',
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
