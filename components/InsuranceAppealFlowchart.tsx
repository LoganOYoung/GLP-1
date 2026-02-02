'use client';

import { FileText, CheckCircle2, Clock, AlertCircle, ArrowRight } from 'lucide-react';

const steps = [
  { id: 1, title: 'Get Denial Letter', icon: FileText, color: 'primary' },
  { id: 2, title: 'Gather Documentation', icon: FileText, color: 'primary' },
  { id: 3, title: 'Submit Appeal', icon: FileText, color: 'secondary' },
  { id: 4, title: 'Follow Up', icon: Clock, color: 'accent-amber' },
  { id: 5, title: 'Result', icon: CheckCircle2, color: 'secondary' },
];

export default function InsuranceAppealFlowchart() {
  return (
    <div className="rounded-none border-2 border-primary-100 bg-gradient-to-br from-white to-primary-50/20 p-6 shadow-md">
      <h3 className="mb-6 text-lg font-bold text-gray-900">Insurance Appeal Process</h3>
      <div className="relative">
        {/* Flow Line */}
        <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary-300 via-primary-400 to-secondary-300 hidden md:block" />
        
        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            const colorClasses = {
              primary: 'bg-primary-100 text-primary-600 border-primary-200',
              secondary: 'bg-secondary-100 text-secondary-600 border-secondary-200',
              'accent-amber': 'bg-accent-amber-100 text-accent-amber-600 border-accent-amber-200',
            };
            
            return (
              <div key={step.id} className="relative flex items-center gap-4">
                {/* Step Circle */}
                <div className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-none border-2 ${colorClasses[step.color as keyof typeof colorClasses]} shadow-md`}>
                  <Icon className="h-6 w-6" />
                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-none bg-white border-2 border-gray-300 text-xs font-bold text-gray-700">
                    {step.id}
                  </span>
                </div>
                
                {/* Step Content */}
                <div className="flex-1 rounded-none border-2 border-gray-200 bg-white p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-900">{step.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    {step.id === 1 && 'Obtain your insurance denial letter with reason and appeal instructions.'}
                    {step.id === 2 && 'Collect medical records, doctor\'s letter, and diagnosis documentation.'}
                    {step.id === 3 && 'Submit formal appeal by deadline to the address in denial letter.'}
                    {step.id === 4 && 'Track status and prepare for second-level appeal if needed.'}
                    {step.id === 5 && 'Receive approval or explore alternative options.'}
                  </p>
                </div>
                
                {/* Arrow (except last) */}
                {!isLast && (
                  <div className="hidden md:block absolute left-15 top-16 text-primary-400">
                    <ArrowRight className="h-5 w-5 rotate-90" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
