'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';

const steps = [
  {
    id: 'budget',
    title: 'Rough monthly budget for medication',
    options: [
      { value: 'minimal', label: 'Minimize cost (under ~$200)' },
      { value: 'low', label: '~$200–500' },
      { value: 'mid', label: '~$500–1,000' },
      { value: 'high', label: 'Over ~$1,000 or flexible' },
    ],
  },
  {
    id: 'preference',
    title: 'Preference',
    options: [
      { value: 'injection', label: 'Injection is fine' },
      { value: 'oral', label: 'Prefer oral (daily pill)' },
      { value: 'any', label: 'No strong preference' },
    ],
  },
  {
    id: 'goal',
    title: 'Primary goal',
    options: [
      { value: 'weight', label: 'Weight loss' },
      { value: 'diabetes', label: 'Diabetes / blood sugar' },
      { value: 'both', label: 'Both' },
    ],
  },
];

type Answers = Record<string, string>;

type BulletSegment = { type: 'text'; value: string } | { type: 'link'; label: string; href: string };
type Result = { title: string; bullets: BulletSegment[][]; cta: string; href: string };

function getResult(answers: Answers): Result {
  const budget = answers.budget;
  const preference = answers.preference;
  const goal = answers.goal;

  if (budget === 'minimal') {
    return {
      title: 'Focus on lowest-cost options',
      bullets: [
        [{ type: 'text', value: 'Check if you qualify for manufacturer savings or patient assistance (see ' }, { type: 'link', label: 'Cost & Insurance', href: '/cost-insurance' }, { type: 'text', value: ').' }],
        [{ type: 'text', value: 'Consider compounded semaglutide from a licensed pharmacy—typically ~$150–$350/month. See our ' }, { type: 'link', label: 'Legitimacy Tracker', href: '/legitimacy' }, { type: 'text', value: ' to avoid scams.' }],
        [{ type: 'text', value: 'If you have insurance, use our appeal letter template and discount card list on ' }, { type: 'link', label: 'Cost & Insurance', href: '/cost-insurance' }, { type: 'text', value: '.' }],
      ],
      cta: 'Cost & Insurance',
      href: '/cost-insurance',
    };
  }
  if (budget === 'low' && preference === 'oral') {
    return {
      title: 'Oral option in the $200–500 range',
      bullets: [
        [{ type: 'text', value: 'Rybelsus (oral semaglutide) may fit with insurance + savings card. Use our ' }, { type: 'link', label: 'Calculator', href: '/calculator' }, { type: 'text', value: ' to estimate.' }],
        [{ type: 'text', value: 'If paying out of pocket, oral list price is high; compounded injectable may be in your range—see ' }, { type: 'link', label: 'Alternatives', href: '/alternatives' }, { type: 'text', value: '.' }],
        [{ type: 'text', value: 'Verify any compounded pharmacy with our ' }, { type: 'link', label: 'Legitimacy Tracker', href: '/legitimacy' }, { type: 'text', value: '.' }],
      ],
      cta: 'Calculator',
      href: '/calculator',
    };
  }
  if (budget === 'low' && (preference === 'injection' || preference === 'any')) {
    return {
      title: 'Injectable or compounded in the $200–500 range',
      bullets: [
        [{ type: 'text', value: 'With insurance + savings card, brand injectables often run $25–$50/mo. Use our ' }, { type: 'link', label: 'Calculator', href: '/calculator' }, { type: 'text', value: '.' }],
        [{ type: 'text', value: 'Without insurance, compounded semaglutide from a licensed pharmacy (~$150–$350/mo) may fit. See ' }, { type: 'link', label: 'Alternatives', href: '/alternatives' }, { type: 'text', value: ' and ' }, { type: 'link', label: 'Legitimacy Tracker', href: '/legitimacy' }, { type: 'text', value: '.' }],
        [{ type: 'text', value: 'See ' }, { type: 'link', label: 'Cost & Insurance', href: '/cost-insurance' }, { type: 'text', value: ' for discount cards and appeal templates.' }],
      ],
      cta: 'Alternatives',
      href: '/alternatives',
    };
  }
  if (budget === 'mid') {
    return {
      title: 'Brand or compounded options',
      bullets: [
        [{ type: 'text', value: 'Brand Ozempic, Wegovy, Mounjaro, or Zepbound may be feasible with insurance + savings card. Use our ' }, { type: 'link', label: 'Calculator', href: '/calculator' }, { type: 'text', value: '.' }],
        [{ type: 'text', value: 'If paying out of pocket, compare brand list price vs licensed compounded in our ' }, { type: 'link', label: 'Alternatives', href: '/alternatives' }, { type: 'text', value: '.' }],
        [{ type: 'text', value: 'Check FDA shortage status on our ' }, { type: 'link', label: 'Legitimacy', href: '/legitimacy/shortage' }, { type: 'text', value: ' page—supply can affect availability.' }],
      ],
      cta: 'Calculator',
      href: '/calculator',
    };
  }
  if (budget === 'high') {
    return {
      title: 'You have flexibility—choose by preference',
      bullets: [
        [{ type: 'text', value: 'Brand options (injection or oral) are often $25–$50/mo with insurance + card. Use our ' }, { type: 'link', label: 'Calculator', href: '/calculator' }, { type: 'text', value: '.' }],
        [{ type: 'text', value: 'Compare oral vs injection in our ' }, { type: 'link', label: 'Alternatives', href: '/alternatives' }, { type: 'text', value: " if you're deciding." }],
        [{ type: 'text', value: 'Check shortage status on ' }, { type: 'link', label: 'Legitimacy', href: '/legitimacy/shortage' }, { type: 'text', value: ' in case your dose is affected.' }],
      ],
      cta: 'Calculator',
      href: '/calculator',
    };
  }
  return {
    title: 'Next steps',
    bullets: [
      [{ type: 'text', value: 'Use our Out-of-Pocket ' }, { type: 'link', label: 'Calculator', href: '/calculator' }, { type: 'text', value: ' to estimate cost with your insurance and options.' }],
      [{ type: 'text', value: 'Read ' }, { type: 'link', label: 'Alternatives', href: '/alternatives' }, { type: 'text', value: ' for brand vs compounded and oral vs injection.' }],
      [{ type: 'text', value: 'See ' }, { type: 'link', label: 'Legitimacy Tracker', href: '/legitimacy' }, { type: 'text', value: ' to verify pharmacies and check shortage status.' }],
    ],
    cta: 'Calculator',
    href: '/calculator',
  };
}

export default function QuizPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const step = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  const handleChoice = (value: string) => {
    const next = { ...answers, [step.id]: value };
    setAnswers(next);
    if (isLastStep) {
      setDone(true);
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const result = done ? getResult(answers) : null;

  return (
    <div className="container-page max-w-2xl section-pad">
      <Breadcrumbs items={[{ label: 'Find Your Option' }]} />
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">You&apos;re in: Find Your Option</p>
      <div className="mb-8 overflow-hidden rounded-none border border-gray-200 shadow-sm">
        <div className="relative h-44 w-full">
          <Image
            src="/images/banners/quiz-tool-banner.png"
            alt="Find your option - personalized next steps for GLP-1"
            width={800}
            height={176}
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/40 to-transparent px-6">
            <h1 className="text-2xl font-bold text-white drop-shadow sm:text-3xl">Find Your Option</h1>
            <p className="mt-2 max-w-md text-sm text-white/95 drop-shadow">
              Answer a few questions to get personalized next steps. We don&apos;t prescribe or sell—we point you to the right content and tools.
            </p>
            <p className="mt-1 max-w-md text-xs text-white/80 drop-shadow">
              For anyone not sure which path fits—budget, preference, and goals.
            </p>
          </div>
        </div>
      </div>
      <p className="mb-6 text-gray-600">Choose the option that best fits your budget, preference, and goal.</p>

      {!done ? (
        <div className="mt-8 rounded-none border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Step {stepIndex + 1} of {steps.length}
          </p>
          <h2 className="mt-2 text-lg font-semibold text-gray-900">{step.title}</h2>
          <ul className="mt-4 space-y-2">
            {step.options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => handleChoice(opt.value)}
                  className="w-full rounded-none border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-900 hover:border-gray-300 hover:bg-gray-100"
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={() => setStepIndex(stepIndex - 1)}
              className="mt-6 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
          )}
        </div>
      ) : (
        <div className="mt-8 rounded-none border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">{result?.title}</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-gray-600">
            {result?.bullets.map((bullet, i) => (
              <li key={i}>
                {bullet.map((seg, j) =>
                  seg.type === 'text' ? (
                    <span key={j}>{seg.value}</span>
                  ) : (
                    <Link key={j} href={seg.href} className="font-medium text-primary-600 underline hover:no-underline">
                      {seg.label}
                    </Link>
                  )
                )}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm font-semibold text-gray-900">Based on your situation, your next step is:</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={result?.href ?? '/calculator'}
              className="inline-block rounded-none bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
            >
              Go to {result?.cta}
            </Link>
            <button
              type="button"
              onClick={() => { setDone(false); setStepIndex(0); setAnswers({}); }}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
