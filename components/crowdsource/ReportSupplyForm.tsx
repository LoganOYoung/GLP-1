'use client';

import { useState } from 'react';
import { getSupabaseConfig, isSupabaseConfigured, insertSupplyReport } from '@/lib/supabase';

const DRUGS = ['Wegovy', 'Ozempic', 'Zepbound', 'Mounjaro', 'Rybelsus', 'Compounded semaglutide', 'Other'];

export default function ReportSupplyForm() {
  const [drug, setDrug] = useState('');
  const [pharmacy, setPharmacy] = useState('');
  const [cityState, setCityState] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const configured = isSupabaseConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!configured) {
      setStatus('error');
      setErrorMsg('Community reports are not connected yet. Check back soon.');
      return;
    }
    if (!drug.trim() || !pharmacy.trim() || !cityState.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in drug, pharmacy/platform, and city or state.');
      return;
    }
    setStatus('sending');
    setErrorMsg('');
    const config = getSupabaseConfig()!;
    const result = await insertSupplyReport(config, {
      drug: drug.trim(),
      pharmacy_or_platform: pharmacy.trim(),
      city_state: cityState.trim(),
      note: note.trim() || undefined,
    });
    if (result.ok) {
      setStatus('done');
      setDrug('');
      setPharmacy('');
      setCityState('');
      setNote('');
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Failed to submit.');
    }
  };

  if (status === 'done') {
    return (
      <div className="rounded-none border-2 border-primary-200 bg-primary-50 p-4 text-center">
        <p className="font-semibold text-primary-800">Thank you!</p>
        <p className="mt-1 text-sm text-primary-700">Your report helps others find supply. It will appear in the community feed after a quick check.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="crowdsource-supply-drug" className="block text-sm font-medium text-gray-700">Drug you got</label>
        <select
          id="crowdsource-supply-drug"
          value={drug}
          onChange={(e) => setDrug(e.target.value)}
          required
          className="mt-1 w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="">Select…</option>
          {DRUGS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="crowdsource-supply-pharmacy" className="block text-sm font-medium text-gray-700">Pharmacy or platform</label>
        <input
          id="crowdsource-supply-pharmacy"
          type="text"
          value={pharmacy}
          onChange={(e) => setPharmacy(e.target.value)}
          required
          placeholder="e.g. Costco Houston, Henry Meds"
          className="mt-1 w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      <div>
        <label htmlFor="crowdsource-supply-citystate" className="block text-sm font-medium text-gray-700">City or state</label>
        <input
          id="crowdsource-supply-citystate"
          type="text"
          value={cityState}
          onChange={(e) => setCityState(e.target.value)}
          required
          placeholder="e.g. Houston, TX"
          className="mt-1 w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      <div>
        <label htmlFor="crowdsource-supply-note" className="block text-sm font-medium text-gray-700">Note (optional)</label>
        <input
          id="crowdsource-supply-note"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. 2.5 mg, had to wait 1 week"
          className="mt-1 w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-none bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {status === 'sending' ? 'Submitting…' : 'Submit supply report'}
      </button>
      {!configured && (
        <p className="text-xs text-gray-500">Reports are saved once the community backend is connected.</p>
      )}
    </form>
  );
}
