'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle2, Info, TrendingDown, DollarSign, Shield, Gift, Building2, Share2, FileDown, Flag } from 'lucide-react';
import Link from 'next/link';
import type { AdvancedCalculatorResult } from '@/app/calculator/advanced-calculator-engine';
import ShareButtons from './ShareButtons';

/** Data freshness label for calculator (align with docs/DATA-UPDATE-PROCESS.md) */
const DATA_AS_OF = 'January 2026';

interface AdvancedResultsDashboardProps {
  results: AdvancedCalculatorResult;
  input: {
    insuranceProvider?: string;
    state?: string;
    hasHsa?: boolean;
    hasFsa?: boolean;
  };
}

export default function AdvancedResultsDashboard({ results, input }: AdvancedResultsDashboardProps) {
  const [expandedScenario, setExpandedScenario] = useState<string | null>(results.bestOption.id);
  const [showAllScenarios, setShowAllScenarios] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const toggleScenario = (id: string) => {
    setExpandedScenario(expandedScenario === id ? null : id);
  };

  const displayedScenarios = showAllScenarios 
    ? results.scenarios 
    : [results.bestOption, ...results.scenarios.filter(s => s.id !== results.bestOption.id).slice(0, 2)];

  const shareTitle = 'My GLP-1 Cost Estimate';
  const shareDescription = `Best option: ${results.bestOption.name} at $${Math.round(results.bestOption.totalMonthlyAfterAllSavings)}/month. Try the 2026 calculator:`;

  const handlePrintPdf = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const reportMailto = 'mailto:support@example.com?subject=Calculator%20price%20discrepancy%20report&body=Please%20describe%20the%20price%20or%20program%20you%20noticed%20that%20does%20not%20match%20our%20calculator.';

  return (
    <div className="space-y-6">
      {/* Action bar: data timestamp, share, save PDF, report */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 rounded-none border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs text-slate-600 sm:text-sm">
          Data as of <strong>{DATA_AS_OF}</strong>. Prices and programs may change.
        </p>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setShowShare(!showShare)}
            className="inline-flex items-center gap-1.5 rounded-none border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 sm:text-sm"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
          <button
            type="button"
            onClick={handlePrintPdf}
            className="inline-flex items-center gap-1.5 rounded-none border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 sm:text-sm"
          >
            <FileDown className="h-4 w-4" />
            Print / Save PDF
          </button>
          <a
            href={reportMailto}
            className="inline-flex items-center gap-1.5 rounded-none border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 sm:text-sm"
          >
            <Flag className="h-4 w-4" />
            Report price issue
          </a>
        </div>
      </div>
      {showShare && (
        <div className="no-print rounded-none border border-slate-200 bg-white p-4">
          <ShareButtons
            title={shareTitle}
            url="/calculator"
            description={`${shareDescription} ${typeof window !== 'undefined' ? window.location.origin : ''}/calculator`}
          />
        </div>
      )}

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-none border-2 border-primary-500 bg-gradient-to-br from-primary-50 to-white p-4 shadow-lg sm:p-6"
      >
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Your Personalized Results</h2>
            <p className="mt-1 text-sm text-slate-600">
              Based on your insurance and medical profile
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-primary-600 sm:text-2xl">
              ${Math.round(results.bestOption.totalMonthlyAfterAllSavings)}
            </div>
            <div className="text-xs text-slate-600">per month</div>
          </div>
        </div>

        {/* Key Insights */}
        {results.summary.keyInsights.length > 0 && (
          <div className="mb-4 space-y-2">
            {results.summary.keyInsights.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-2 rounded-none bg-primary-50 p-3 text-sm text-primary-800">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{insight}</span>
              </div>
            ))}
          </div>
        )}

        {/* Savings Potential */}
        {results.summary.annualSavingsPotential > 0 && (
          <div className="rounded-none border border-primary-200 bg-primary-50 p-3 sm:p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-primary-900">Potential Annual Savings</p>
                <p className="mt-1 text-xs text-primary-700">
                  By choosing the best option vs brand baseline
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-lg font-bold text-primary-700 sm:text-xl">
                  ${Math.round(results.summary.annualSavingsPotential).toLocaleString()}
                </div>
                <div className="text-xs text-primary-600">per year</div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Best Option Highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-none border-2 border-secondary-500 bg-gradient-to-br from-secondary-50 to-white p-4 shadow-lg sm:p-6"
      >
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="shrink-0 rounded-none bg-secondary-500 p-2">
              <CheckCircle2 className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">Best Option for You</h3>
              <p className="text-sm text-slate-600">{results.bestOption.name}</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-sm font-medium text-slate-600">Recommendation Score</div>
            <div className="text-xl font-bold text-secondary-600 sm:text-2xl">{results.bestOption.recommendationScore}/100</div>
          </div>
        </div>

        <p className="mb-4 text-sm text-slate-700">{results.bestOption.recommendationReason}</p>

        <Link
          href={results.bestOption.ctaLink}
          className="inline-flex items-center gap-2 rounded-none bg-secondary-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary-600"
        >
          {results.bestOption.cta}
        </Link>
      </motion.div>

      {/* Detailed Cost Breakdown for Best Option */}
      <DetailedCostBreakdown scenario={results.bestOption} input={input} />

      {/* All Scenarios */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Compare All Options</h3>
          <button
            onClick={() => setShowAllScenarios(!showAllScenarios)}
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            {showAllScenarios ? 'Show Less' : 'Show All Options'}
          </button>
        </div>

        <div className="space-y-4">
          {displayedScenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              isExpanded={expandedScenario === scenario.id}
              onToggle={() => toggleScenario(scenario.id)}
              isBestOption={scenario.id === results.bestOption.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailedCostBreakdown({
  scenario,
  input,
}: {
  scenario: AdvancedCalculatorResult['bestOption'];
  input: { insuranceProvider?: string; state?: string; hasHsa?: boolean; hasFsa?: boolean };
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-none border border-slate-200 bg-white shadow-sm"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Detailed Cost Breakdown</h3>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-200 p-4">
              {/* Base Cost */}
              <div className="mb-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">Base Medication Cost</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">${scenario.baseCost.toLocaleString()}</span>
                </div>

                {/* Insurance Coverage */}
                {scenario.insuranceCoverage > 0 && (
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary-500" />
                      <span className="text-sm font-medium text-slate-700">
                        Insurance Coverage ({Math.round(scenario.insuranceCoverage * 100)}%)
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      -${scenario.insuranceDiscount.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Copay/Coinsurance */}
                {(scenario.monthlyCopay > 0 || scenario.monthlyCoinsurance > 0) && (
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">
                        {scenario.monthlyCopay > 0 ? 'Copay' : 'Coinsurance'}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      ${(scenario.monthlyCopay + scenario.monthlyCoinsurance).toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Manufacturer Card Savings */}
                {scenario.manufacturerCardSavings > 0 && (
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Gift className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium text-slate-700">Manufacturer Savings Card</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      -${scenario.manufacturerCardSavings.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* TrumpRx Savings */}
                {scenario.trumpRxSavings > 0 && (
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-primary-500" />
                      <span className="text-sm font-medium text-slate-700">TrumpRx $350 Program</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      -${scenario.trumpRxSavings.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* HSA/FSA Tax Benefit */}
                {scenario.hsaFsaTaxBenefit > 0 && (
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary-500" />
                      <span className="text-sm font-medium text-slate-700">
                        HSA/FSA Tax Benefit ({Math.round((scenario.hsaFsaTaxBenefit / scenario.totalMonthlyAfterAllSavings) * 100)}%)
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      -${scenario.hsaFsaTaxBenefit.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Hidden Costs */}
                {(scenario.monthlyHiddenCosts.consultation > 0 ||
                  scenario.monthlyHiddenCosts.shipping > 0 ||
                  scenario.monthlyHiddenCosts.membership > 0) && (
                  <div className="mt-3 space-y-1 border-t border-slate-200 pt-2">
                    <p className="text-xs font-medium text-slate-600">Additional Costs:</p>
                    {scenario.monthlyHiddenCosts.consultation > 0 && (
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>Consultation Fee</span>
                        <span>${scenario.monthlyHiddenCosts.consultation}</span>
                      </div>
                    )}
                    {scenario.monthlyHiddenCosts.shipping > 0 && (
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>Shipping</span>
                        <span>${scenario.monthlyHiddenCosts.shipping}</span>
                      </div>
                    )}
                    {scenario.monthlyHiddenCosts.membership > 0 && (
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>Membership Fee</span>
                        <span>${scenario.monthlyHiddenCosts.membership}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Total */}
                <div className="mt-4 flex items-center justify-between border-t-2 border-slate-300 pt-3">
                  <span className="text-base font-bold text-slate-900">Total Monthly Cost (After All Savings)</span>
                  <span className="text-xl font-bold text-primary-600">
                    ${Math.round(scenario.totalMonthlyAfterAllSavings).toLocaleString()}
                  </span>
                </div>

                {/* Annual Cost */}
                <div className="flex items-center justify-between border-t border-slate-200 pt-2">
                  <span className="text-sm font-medium text-slate-700">Annual Cost (Effective)</span>
                  <span className="text-base font-semibold text-slate-900">
                    ${Math.round(scenario.effectiveAnnualCost).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ScenarioCard({
  scenario,
  isExpanded,
  onToggle,
  isBestOption,
}: {
  scenario: AdvancedCalculatorResult['scenarios'][0];
  isExpanded: boolean;
  onToggle: () => void;
  isBestOption: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-none border-2 p-4 transition-colors ${
        isBestOption
          ? 'border-secondary-500 bg-secondary-50 shadow-md'
          : 'border-slate-200 bg-white shadow-sm'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-base font-bold text-slate-900 sm:text-lg">{scenario.name}</h4>
              {isBestOption && (
                <span className="rounded-none bg-secondary-500 px-2 py-0.5 text-xs font-bold text-white">
                  BEST
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-600">{scenario.category}</p>
          </div>
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <div className="text-left sm:text-right">
              <div className="text-lg font-bold text-slate-900 sm:text-xl">
                ${Math.round(scenario.totalMonthlyAfterAllSavings).toLocaleString()}
              </div>
              <div className="text-xs text-slate-600">per month</div>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" />
            ) : (
              <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
            )}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4 border-t border-slate-200 pt-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-none border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-600">PA Success</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {scenario.paSuccessProbability}% ({scenario.paSuccessLevel})
                  </p>
                </div>
                <div className="rounded-none border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-600">Ease of Access</p>
                  <div className="mt-1 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${star <= scenario.easeOfAccess ? 'text-secondary-500' : 'text-slate-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Savings Breakdown */}
              {(scenario.manufacturerCardSavings > 0 ||
                scenario.trumpRxSavings > 0 ||
                scenario.hsaFsaTaxBenefit > 0) && (
                <div className="rounded-none border border-primary-200 bg-primary-50 p-3">
                  <p className="mb-2 text-xs font-semibold text-primary-900">Savings Applied:</p>
                  <div className="space-y-1 text-xs text-primary-800">
                    {scenario.manufacturerCardSavings > 0 && (
                      <div className="flex justify-between">
                        <span>Manufacturer Card</span>
                        <span className="font-medium">-${scenario.manufacturerCardSavings}</span>
                      </div>
                    )}
                    {scenario.trumpRxSavings > 0 && (
                      <div className="flex justify-between">
                        <span>TrumpRx Program</span>
                        <span className="font-medium">-${scenario.trumpRxSavings}</span>
                      </div>
                    )}
                    {scenario.hsaFsaTaxBenefit > 0 && (
                      <div className="flex justify-between">
                        <span>HSA/FSA Tax Benefit</span>
                        <span className="font-medium">-${scenario.hsaFsaTaxBenefit.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Features */}
              <div>
                <p className="mb-2 text-xs font-semibold text-slate-700">Features:</p>
                <ul className="space-y-1">
                  {scenario.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-primary-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pros & Cons */}
              <div className="grid gap-3 sm:grid-cols-2">
                {scenario.pros.length > 0 && (
                  <div>
                    <p className="mb-1 text-xs font-semibold text-primary-700">Pros:</p>
                    <ul className="space-y-1">
                      {scenario.pros.map((pro, idx) => (
                        <li key={idx} className="text-xs text-primary-800">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {scenario.cons.length > 0 && (
                  <div>
                    <p className="mb-1 text-xs font-semibold text-red-700">Cons:</p>
                    <ul className="space-y-1">
                      {scenario.cons.map((con, idx) => (
                        <li key={idx} className="text-xs text-red-800">• {con}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* CTA */}
              <Link
                href={scenario.ctaLink}
                className={`block w-full rounded-none px-4 py-2.5 text-center text-sm font-medium transition ${
                  isBestOption
                    ? 'bg-secondary-500 text-white hover:bg-secondary-600'
                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {scenario.cta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
