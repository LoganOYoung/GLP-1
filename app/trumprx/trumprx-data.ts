/**
 * TrumpRx $350 Program Data
 * Loaded from data/trumprx-states.json - update quarterly; see docs/DATA-UPDATE-PROCESS.md
 */

import raw from '@/data/trumprx-states.json';

export type TrumpRxStatus = 'active' | 'pending' | 'not-available';

export const TRUMPRX_LAST_UPDATED = raw.lastUpdated;

export interface TrumpRxState {
  stateCode: string;
  stateName: string;
  status: TrumpRxStatus;
  effectiveDate?: string;
  monthlyCap: number;
  eligibilityCriteria: string[];
  applicationLink?: string;
  lastUpdated: string;
  notes?: string;
}

export const TRUMPRX_STATES: TrumpRxState[] = raw.states as TrumpRxState[];

/** Get state by code */
export function getStateByCode(code: string): TrumpRxState | undefined {
  return TRUMPRX_STATES.find((s) => s.stateCode === code);
}

/** Get states by status */
export function getStatesByStatus(status: TrumpRxStatus): TrumpRxState[] {
  return TRUMPRX_STATES.filter((s) => s.status === status);
}

/** Get all active states */
export function getActiveStates(): TrumpRxState[] {
  return getStatesByStatus('active');
}

/** Get all pending states */
export function getPendingStates(): TrumpRxState[] {
  return getStatesByStatus('pending');
}
