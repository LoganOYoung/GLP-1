'use client';

import { ArrowRight, CheckCircle2, AlertTriangle, DollarSign, Pill } from 'lucide-react';

interface DecisionNode {
  id: string;
  title: string;
  question: string;
  icon: React.ElementType;
  color: 'primary' | 'secondary' | 'accent-amber';
  options: Array<{
    label: string;
    path: string;
    result: string;
  }>;
}

const decisionFlow: DecisionNode[] = [
  {
    id: 'start',
    title: 'Start Here',
    question: 'What is your main concern?',
    icon: AlertTriangle,
    color: 'primary',
    options: [
      { label: 'Out of Stock', path: 'out-of-stock', result: 'Compounded or Oral' },
      { label: 'Too Expensive', path: 'expensive', result: 'Compounded' },
      { label: 'Insurance Denied', path: 'denied', result: 'Compounded or Cash-pay' },
    ],
  },
];

export default function DecisionFlowchart() {
  return (
    <div className="rounded-none border-2 border-primary-100 bg-white p-6 shadow-md">
      <h3 className="mb-6 text-lg font-bold text-gray-900">Decision Flow Guide</h3>
      <div className="space-y-6">
        {decisionFlow.map((node, index) => {
          const Icon = node.icon;
          const colorClasses = {
            primary: 'bg-primary-100 text-primary-600 border-primary-200',
            secondary: 'bg-secondary-100 text-secondary-600 border-secondary-200',
            'accent-amber': 'bg-accent-amber-100 text-accent-amber-600 border-accent-amber-200',
          };
          
          return (
            <div key={node.id} className="space-y-4">
              {/* Node */}
              <div className={`flex items-center gap-4 rounded-none border-2 p-4 ${colorClasses[node.color]}`}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none bg-white shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{node.title}</h4>
                  <p className="text-sm text-gray-600">{node.question}</p>
                </div>
              </div>
              
              {/* Options */}
              <div className="ml-16 space-y-3">
                {node.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center gap-3">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex-1 rounded-none border border-gray-200 bg-gray-50 p-3">
                      <p className="font-medium text-gray-900">{option.label}</p>
                      <p className="text-xs text-gray-600 mt-1">→ {option.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
