'use client';

import { CheckCircle2, AlertTriangle, XCircle, Calendar } from 'lucide-react';
import type { LabInspection, InspectionResult } from '@/lib/lab-data';

interface LabInspectionRecordProps {
  inspection: LabInspection;
}

export default function LabInspectionRecord({ inspection }: LabInspectionRecordProps) {
  const getResultIcon = (result: InspectionResult) => {
    switch (result) {
      case 'satisfactory':
        return <CheckCircle2 className="h-4 w-4 text-primary-600" />;
      case 'voluntary-action-indicated':
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'official-action-indicated':
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getResultColor = (result: InspectionResult) => {
    switch (result) {
      case 'satisfactory':
        return 'border-primary-200 bg-primary-50';
      case 'voluntary-action-indicated':
        return 'border-amber-200 bg-amber-50';
      case 'official-action-indicated':
        return 'border-red-200 bg-red-50';
    }
  };

  const getResultText = (result: InspectionResult) => {
    switch (result) {
      case 'satisfactory':
        return 'Satisfactory';
      case 'voluntary-action-indicated':
        return 'Voluntary Action Indicated (VAI)';
      case 'official-action-indicated':
        return 'Official Action Indicated (OAI)';
    }
  };

  return (
    <div className={`rounded-none border p-4 ${getResultColor(inspection.result)}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {getResultIcon(inspection.result)}
            <h4 className="text-sm font-semibold text-slate-900">Last FDA Inspection</h4>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
            <Calendar className="h-3 w-3" />
            <span>{new Date(inspection.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <p className="mt-2 text-sm font-medium text-slate-900">{getResultText(inspection.result)}</p>
          {inspection.findings && inspection.findings.length > 0 && (
            <div className="mt-3">
              <p className="mb-1 text-xs font-medium text-slate-700">Key Findings:</p>
              <ul className="space-y-1">
                {inspection.findings.map((finding, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-none bg-slate-400" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {inspection.reportLink && (
            <a
              href={inspection.reportLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs font-medium text-slate-700 underline hover:no-underline"
            >
              View Full Report →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
