/**
 * Compounding Lab Transparency Database
 * FDA 503A/503B lab information and inspection records
 * Pure frontend data - no backend required
 */

export type LabType = '503A' | '503B';
export type InspectionResult = 'satisfactory' | 'voluntary-action-indicated' | 'official-action-indicated';

export interface LabInspection {
  date: string; // YYYY-MM-DD
  result: InspectionResult;
  findings?: string[];
  reportLink?: string;
}

export interface CompoundingLab {
  id: string;
  name: string;
  type: LabType;
  state: string;
  licenseNumber: string;
  fdaRegistrationNumber?: string; // For 503B labs
  address?: string;
  phone?: string;
  website?: string;
  lastInspection?: LabInspection;
  platforms: string[]; // Telehealth platforms using this lab
  notes?: string;
}

export const COMPOUNDING_LABS: CompoundingLab[] = [
  {
    id: 'lab-1',
    name: 'ABC Compounding Pharmacy',
    type: '503A',
    state: 'TX',
    licenseNumber: 'TX-503A-12345',
    address: '123 Main St, Houston, TX 77001',
    phone: '(555) 123-4567',
    lastInspection: {
      date: '2025-11-15',
      result: 'satisfactory',
      findings: ['No significant findings'],
    },
    platforms: ['henry-meds', 'ro'],
    notes: 'Specializes in semaglutide compounding. LegitScript certified.',
  },
  {
    id: 'lab-2',
    name: 'XYZ Compounding Solutions',
    type: '503B',
    state: 'FL',
    licenseNumber: 'FL-503B-67890',
    fdaRegistrationNumber: 'FDA-REG-123456',
    address: '456 Oak Ave, Miami, FL 33101',
    phone: '(555) 987-6543',
    lastInspection: {
      date: '2025-09-20',
      result: 'satisfactory',
      findings: ['Minor documentation issues resolved'],
    },
    platforms: ['mochi', 'henry-meds'],
    notes: 'Large-scale 503B facility. FDA registered.',
  },
  {
    id: 'lab-3',
    name: 'Premium Compounding Labs',
    type: '503A',
    state: 'CA',
    licenseNumber: 'CA-503A-11111',
    address: '789 Pine St, Los Angeles, CA 90001',
    phone: '(555) 555-5555',
    lastInspection: {
      date: '2025-12-10',
      result: 'voluntary-action-indicated',
      findings: ['Sterility testing documentation needs improvement', 'Corrective actions in progress'],
    },
    platforms: ['ro'],
    notes: 'Working on improving documentation processes.',
  },
  {
    id: 'lab-4',
    name: 'National Compounding Center',
    type: '503B',
    state: 'TN',
    licenseNumber: 'TN-503B-22222',
    fdaRegistrationNumber: 'FDA-REG-789012',
    address: '321 Elm St, Nashville, TN 37201',
    phone: '(555) 444-3333',
    lastInspection: {
      date: '2025-10-05',
      result: 'satisfactory',
      findings: ['No significant findings'],
    },
    platforms: ['mochi'],
    notes: 'High-volume 503B facility. Multiple state licenses.',
  },
];

/** Get lab by ID */
export function getLabById(id: string): CompoundingLab | undefined {
  return COMPOUNDING_LABS.find((lab) => lab.id === id);
}

/** Get labs by platform */
export function getLabsByPlatform(platformId: string): CompoundingLab[] {
  return COMPOUNDING_LABS.filter((lab) => lab.platforms.includes(platformId));
}

/** Get labs by state */
export function getLabsByState(state: string): CompoundingLab[] {
  return COMPOUNDING_LABS.filter((lab) => lab.state === state);
}

/** Get labs by type */
export function getLabsByType(type: LabType): CompoundingLab[] {
  return COMPOUNDING_LABS.filter((lab) => lab.type === type);
}

/** Platform to Lab mapping */
export const PLATFORM_LAB_MAP: Record<string, string[]> = {
  'henry-meds': ['lab-1', 'lab-2'],
  'ro': ['lab-1', 'lab-3'],
  'mochi': ['lab-2', 'lab-4'],
};
