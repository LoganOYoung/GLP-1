'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { TRUMPRX_STATES, TRUMPRX_LAST_UPDATED, type TrumpRxState } from './trumprx-data';

interface PolicyChange {
  stateCode: string;
  stateName: string;
  changeType: 'activated' | 'status-changed' | 'new-state';
  oldStatus?: string;
  newStatus: string;
  date: string;
}

// Simulated recent changes (in production, this would be detected automatically)
const RECENT_CHANGES: PolicyChange[] = [
  {
    stateCode: 'CA',
    stateName: 'California',
    changeType: 'activated',
    newStatus: 'active',
    date: '2026-01-15',
  },
  {
    stateCode: 'TX',
    stateName: 'Texas',
    changeType: 'activated',
    newStatus: 'active',
    date: '2026-02-01',
  },
];

export default function TrumpRxChangeDetector() {
  const [recentChanges, setRecentChanges] = useState<PolicyChange[]>([]);
  const [lastChecked, setLastChecked] = useState<string>(TRUMPRX_LAST_UPDATED);

  useEffect(() => {
    // Simulate checking for changes
    // In production, this would compare current data with stored previous state
    const changes = RECENT_CHANGES.filter((change) => {
      const changeDate = new Date(change.date);
      const lastUpdateDate = new Date(lastChecked);
      return changeDate > lastUpdateDate;
    });
    setRecentChanges(changes);
  }, [lastChecked]);

  if (recentChanges.length === 0) return null;

  return (
    <div className="mb-6 rounded-none border-2 border-primary-500 bg-primary-50 p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 shrink-0 text-primary-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-primary-900">Recent Policy Changes</h3>
          <p className="mt-1 text-xs text-primary-800">
            New states activated or status updated since last check:
          </p>
          <div className="mt-3 space-y-2">
            {recentChanges.map((change) => (
              <div
                key={`${change.stateCode}-${change.date}`}
                className="flex items-center justify-between rounded border border-primary-200 bg-white p-2"
              >
                <div className="flex items-center gap-2">
                  {change.changeType === 'activated' ? (
                    <CheckCircle2 className="h-4 w-4 text-primary-600" />
                  ) : (
                    <Clock className="h-4 w-4 text-amber-600" />
                  )}
                  <div>
                    <p className="text-xs font-medium text-slate-900">
                      {change.stateName} ({change.stateCode})
                    </p>
                    <p className="text-xs text-slate-600">
                      {change.changeType === 'activated'
                        ? 'Program activated'
                        : `Status changed to ${change.newStatus}`}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-500">
                  {new Date(change.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-primary-700">
            Last checked: {new Date(lastChecked).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
