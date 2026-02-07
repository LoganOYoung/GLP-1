'use client';

import { useState } from 'react';
import { getSupabaseConfig, isSupabaseConfigured, insertPriceReport } from '@/lib/supabase';

const DRUGS = ['Wegovy', 'Ozempic', 'Zepbound', 'Mounjaro', 'Rybelsus', 'Compounded semaglutide', 'Other'];

export default function ReportPriceForm() {
  const [drug, setDrug] = useState('');
  const [amount, setAmount] = useState('');
  const [pharmacy, setPharmacy] = useState('');
  const [insuranceOrCash, setInsuranceOrCash] = useState('insurance');
  const [stateZip, setStateZip] = useState('');
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
    const amountNum = parseFloat(amount);
    if (!drug.trim() || Number.isNaN(amountNum) || amountNum < 0 || !pharmacy.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in drug, a valid amount, and pharmacy/platform.');
      return;
    }
    setStatus('sending');
    setErrorMsg('');
    const config = getSupabaseConfig()!;
    const result = await insertPriceReport(config, {
      drug: drug.trim(),
      amount_paid_usd: amountNum,
      pharmacy_or_platform: pharmacy.trim(),
      insurance_or_cash: insuranceOrCash,
      state_zip: stateZip.trim() || undefined,
    });
    if (result.ok) {
      setStatus('done');
      setDrug('');
      setAmount('');
      setPharmacy('');
      setStateZip('');
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Failed to submit.');
    }
  };

  if (status === 'done') {
    return (
      <div className="rounded-none border-2 border-primary-200 bg-primary-50 p-4 text-center">
        <p className="font-semibold text-primary-800">Thank you!</p>
        <p className="mt-1 text-sm text-primary-700">Your price report helps others. It will appear in the community feed after a quick check.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="crowdsource-price-drug" className="block text-sm font-medium text-gray-700">Drug</label>
        <select
          id="crowdsource-price-drug"
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
        <label htmlFor="crowdsource-price-amount" className="block text-sm font-medium text-gray-700">Amount paid (USD / month)</label>
        <input
          id="crowdsource-price-amount"
          type="number"
          min="0"
          step="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="e.g. 25"
          className="mt-1 w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      <div>
        <label htmlFor="crowdsource-price-pharmacy" className="block text-sm font-medium text-gray-700">Pharmacy or platform</label>
        <input
          id="crowdsource-price-pharmacy"
          type="text"
          value={pharmacy}
          onChange={(e) => setPharmacy(e.target.value)}
          required
          placeholder="e.g. CVS, Henry Meds"
          className="mt-1 w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-700">Paying with</span>
        <div className="mt-2 flex gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="radio" name="insuranceOrCash" value="insurance" checked={insuranceOrCash === 'insurance'} onChange={() => setInsuranceOrCash('insurance')} />
            Insurance
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="radio" name="insuranceOrCash" value="cash" checked={insuranceOrCash === 'cash'} onChange={() => setInsuranceOrCash('cash')} />
            Cash / out-of-pocket
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="crowdsource-price-statezip" className="block text-sm font-medium text-gray-700">State or ZIP (optional)</label>
        <input
          id="crowdsource-price-statezip"
          type="text"
          value={stateZip}
          onChange={(e) => setStateZip(e.target.value)}
          placeholder="e.g. TX or 77001"
          className="mt-1 w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-none bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {status === 'sending' ? 'Submitting…' : 'Submit price report'}
      </button>
      {!configured && (
        <p className="text-xs text-gray-500">Reports are saved once the community backend is connected.</p>
      )}
    </form>
  );
}
