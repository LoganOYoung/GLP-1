'use client';

import { useState } from 'react';

const TEMPLATE = `[Your name]
[Member ID]
[Date]

[Plan name]
[Appeal address / portal]

Re: Appeal for [Drug name] – [Member ID]

I am writing to appeal the denial of coverage for [drug name] for the above member.

Medical necessity:
[Patient] has been diagnosed with [e.g. type 2 diabetes / obesity with BMI ___ and related conditions]. [Drug name] is medically necessary because [brief reason, e.g. inadequate control on other medications, need for weight loss to reduce cardiovascular risk].

Supporting documentation from the prescribing physician is attached, including diagnosis, treatment history, and clinical justification.

I request that the plan approve coverage for [drug name] in accordance with the member's prescription and formulary procedures.

Sincerely,
[Your name / Physician name and contact]`;

export default function AppealTemplateCopy() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TEMPLATE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-none border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        {copied ? 'Copied!' : 'Copy to clipboard'}
      </button>
      <div className="mt-3 rounded-none border border-gray-200 bg-gray-50 p-4 font-mono text-xs text-gray-700 whitespace-pre-wrap">
        {TEMPLATE}
      </div>
    </div>
  );
}
