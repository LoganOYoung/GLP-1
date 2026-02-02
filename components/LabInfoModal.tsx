'use client';

import { useState } from 'react';
import { X, Building2, ExternalLink } from 'lucide-react';
import { getLabsByPlatform, type CompoundingLab } from '@/lib/lab-data';
import LabInspectionRecord from './LabInspectionRecord';

interface LabInfoModalProps {
  platformId: string;
  platformName: string;
  onClose: () => void;
}

export default function LabInfoModal({ platformId, platformName, onClose }: LabInfoModalProps) {
  const labs = getLabsByPlatform(platformId);

  if (labs.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="relative w-full max-w-2xl rounded-none border border-slate-200 bg-white p-6 shadow-lg">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold text-slate-900">Lab Information</h2>
          <p className="mt-2 text-sm text-slate-600">
            No lab information available for {platformName}. Lab transparency data is being updated.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-none border border-slate-200 bg-white shadow-lg">
        <div className="sticky top-0 border-b border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{platformName} - Compounding Labs</h2>
              <p className="mt-1 text-sm text-slate-600">
                {labs.length} lab{labs.length !== 1 ? 's' : ''} used by this platform
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {labs.map((lab) => (
            <LabCard key={lab.id} lab={lab} />
          ))}
        </div>

        <div className="border-t border-slate-200 bg-slate-50 p-6">
          <p className="text-xs text-slate-600">
            Lab information is updated regularly. For the most current FDA inspection records, visit the{' '}
            <a
              href="https://www.fda.gov/drugs/guidance-compliance-regulatory-information/human-drug-compounding"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-900 underline hover:no-underline"
            >
              FDA website
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function LabCard({ lab }: { lab: CompoundingLab }) {
  return (
    <div className="rounded-none border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-slate-400" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{lab.name}</h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="rounded-none bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                  {lab.type}
                </span>
                <span className="text-xs text-slate-600">{lab.state}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-slate-600">License Number</p>
              <p className="mt-1 text-sm text-slate-900">{lab.licenseNumber}</p>
            </div>
            {lab.fdaRegistrationNumber && (
              <div>
                <p className="text-xs font-medium text-slate-600">FDA Registration</p>
                <p className="mt-1 text-sm text-slate-900">{lab.fdaRegistrationNumber}</p>
              </div>
            )}
            {lab.address && (
              <div>
                <p className="text-xs font-medium text-slate-600">Address</p>
                <p className="mt-1 text-sm text-slate-900">{lab.address}</p>
              </div>
            )}
            {lab.phone && (
              <div>
                <p className="text-xs font-medium text-slate-600">Phone</p>
                <p className="mt-1 text-sm text-slate-900">{lab.phone}</p>
              </div>
            )}
          </div>

          {lab.lastInspection && (
            <div className="mt-4">
              <LabInspectionRecord inspection={lab.lastInspection} />
            </div>
          )}

          {lab.notes && (
            <div className="mt-4 rounded-none border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-700">{lab.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
