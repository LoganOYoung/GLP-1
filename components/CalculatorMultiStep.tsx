'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, CheckCircle2 } from 'lucide-react';
import type { CalculatorInput, InsuranceProvider, Comorbidity } from '@/app/calculator/calculator-engine';
import { calculateScenarios, calculatePASuccess } from '@/app/calculator/calculator-engine';
import { calculateAdvancedScenarios, type AdvancedCalculatorResult } from '@/app/calculator/advanced-calculator-engine';
import AdvancedResultsDashboard from './AdvancedResultsDashboard';
import { getStateByCode, getActiveStates } from '@/app/trumprx/trumprx-data';
import { US_STATES } from '@/lib/us-states';
import {
  trackCalculatorSelection,
  getPersonalizedRecommendations,
  getSimilarUsersStats,
  trackPageView,
} from '@/lib/personalization-engine';
import Link from 'next/link';
import PASuccessChart from './PASuccessChart';
import SavingsVisualization from './SavingsVisualization';
import CostSavingsInfographic from './CostSavingsInfographic';

const INSURANCE_PROVIDERS: { value: InsuranceProvider; label: string }[] = [
  { value: 'aetna', label: 'Aetna' },
  { value: 'bcbs', label: 'Blue Cross Blue Shield' },
  { value: 'cigna', label: 'Cigna' },
  { value: 'unitedhealthcare', label: 'UnitedHealthcare' },
  { value: 'humana', label: 'Humana' },
  { value: 'medicare', label: 'Medicare' },
  { value: 'medicaid', label: 'Medicaid' },
  { value: 'other', label: 'Other / Not Sure' },
  { value: 'none', label: 'No Insurance' },
];

const COMORBIDITIES: { value: Comorbidity; label: string }[] = [
  { value: 'diabetes', label: 'Type 2 Diabetes' },
  { value: 'hypertension', label: 'High Blood Pressure' },
  { value: 'heart-disease', label: 'Heart Disease' },
  { value: 'sleep-apnea', label: 'Sleep Apnea' },
  { value: 'none', label: 'None of the above' },
];

export default function CalculatorMultiStep() {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState<CalculatorInput>({ step: 1 });
  const [results, setResults] = useState<ReturnType<typeof calculateScenarios> | null>(null);
  const [advancedResults, setAdvancedResults] = useState<AdvancedCalculatorResult | null>(null);
  const [useAdvancedView, setUseAdvancedView] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [personalizedRec, setPersonalizedRec] = useState<ReturnType<typeof getPersonalizedRecommendations> | null>(null);
  const [similarUsers, setSimilarUsers] = useState<ReturnType<typeof getSimilarUsersStats> | null>(null);

  useEffect(() => {
    trackPageView('/calculator');
    const rec = getPersonalizedRecommendations();
    setPersonalizedRec(rec);
  }, []);

  useEffect(() => {
    if (input.insuranceProvider && input.comorbidities) {
      const stats = getSimilarUsersStats(input.insuranceProvider, input.comorbidities);
      setSimilarUsers(stats);
      trackCalculatorSelection(input.insuranceProvider, input.comorbidities);
    }
  }, [input.insuranceProvider, input.comorbidities]);

  const updateInput = (updates: Partial<CalculatorInput>) => {
    setInput((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      updateInput({ step: step + 1 });
    } else {
      handleCalculate();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      updateInput({ step: step - 1 });
    }
  };

  // Convert advanced results to legacy format
  const convertAdvancedToLegacy = (advanced: ReturnType<typeof calculateAdvancedScenarios>) => {
    return advanced.scenarios.map(scenario => ({
      name: scenario.name as 'Brand Name' | 'Compounded' | 'Oral Pill',
      monthlyCost: scenario.baseCost,
      annualCost: scenario.baseCost * 12,
      hiddenCosts: scenario.monthlyHiddenCosts,
      totalMonthly: scenario.totalMonthlyAfterAllSavings,
      totalAnnual: scenario.annualTotalCost,
      annualSavings: scenario.annualSavingsVsBaseline,
      easeOfAccess: scenario.easeOfAccess,
      paProbability: scenario.paSuccessLevel,
      paProbabilityPercent: scenario.paSuccessProbability,
      features: scenario.features,
      cta: scenario.cta,
      ctaLink: scenario.ctaLink,
    }));
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      // Use advanced calculator engine for more comprehensive results
      const annualDeductible = input.annualDeductible ?? 0;
      const amountAlreadyMet = Math.min(input.deductibleRemaining ?? 0, annualDeductible);
      const deductibleRemaining = Math.max(0, annualDeductible - amountAlreadyMet);
      const advanced = calculateAdvancedScenarios(input, annualDeductible, deductibleRemaining);
      setAdvancedResults(advanced);
      // Also set legacy format for fallback
      const calculated = convertAdvancedToLegacy(advanced);
      setResults(calculated);
      setIsCalculating(false);
    }, 1500); // Simulate calculation delay
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
      // In production, send to backend/email service
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-white to-secondary-100">
      {/* Progress Bar */}
      <div className="h-1 bg-slate-200">
        <motion.div
          className="h-full bg-secondary-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="container-page max-w-4xl py-6 sm:py-8">
        {personalizedRec?.recommendedPage && (
          <div className="mb-6 text-center">
            <div className="mx-auto max-w-md rounded-none border border-secondary-200 bg-secondary-50 p-3">
              <p className="text-xs text-secondary-800">
                <strong>💡 Personalized Tip:</strong> {personalizedRec.reasoning[0]}
              </p>
            </div>
          </div>
        )}

        {/* Multi-Step Form */}
        <div className="mb-8 rounded-none border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="mb-6 text-xl font-semibold text-slate-900">Step 1: Personal Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">BMI (Body Mass Index)</label>
                    <input
                      type="number"
                      min="18"
                      max="50"
                      value={input.bmi || ''}
                      onChange={(e) => updateInput({ bmi: Number(e.target.value) })}
                      placeholder="e.g. 32"
                      className="mt-2 block w-full rounded-none border border-slate-300 px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <p className="mt-1 text-xs text-slate-500">Used to determine eligibility for weight loss medications</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">State</label>
                    <select
                      value={input.state || ''}
                      onChange={(e) => updateInput({ state: e.target.value })}
                      className="mt-2 block w-full rounded-none border border-slate-300 px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select your state</option>
                      {US_STATES.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-slate-500">
                      Used to check TrumpRx $350 program eligibility
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="mb-6 text-xl font-semibold text-slate-900">Step 2: Insurance Status</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Insurance Provider</label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {INSURANCE_PROVIDERS.map((provider) => (
                        <button
                          key={provider.value}
                          type="button"
                          onClick={() => updateInput({ insuranceProvider: provider.value })}
                          className={`rounded-none border-2 p-4 text-left transition ${
                            input.insuranceProvider === provider.value
                              ? 'border-secondary-500 bg-secondary-50 text-secondary-900'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{provider.label}</span>
                            {input.insuranceProvider === provider.value && (
                              <Check className="h-5 w-5 text-secondary-500" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  {input.insuranceProvider && input.insuranceProvider !== 'none' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Plan Type</label>
                      <select
                        value={input.planType || ''}
                        onChange={(e) => updateInput({ planType: e.target.value as any })}
                        className="mt-2 block w-full rounded-none border border-slate-300 px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select plan type</option>
                        {input.insuranceProvider === 'medicare' ? (
                          <>
                            <option value="medicare-part-d">Medicare Part D</option>
                            <option value="medicare-advantage">Medicare Advantage</option>
                          </>
                        ) : (
                          <>
                            <option value="hmo">HMO</option>
                            <option value="ppo">PPO</option>
                            <option value="hdhp">HDHP (High Deductible)</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={input.hasHsa || false}
                        onChange={(e) => updateInput({ hasHsa: e.target.checked })}
                        className="h-4 w-4 rounded-none border-slate-300 text-secondary-500 focus:ring-primary-500"
                      />
                      <span className="text-sm text-slate-700">I have HSA</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={input.hasFsa || false}
                        onChange={(e) => updateInput({ hasFsa: e.target.checked })}
                        className="h-4 w-4 rounded-none border-slate-300 text-secondary-500 focus:ring-primary-500"
                      />
                      <span className="text-sm text-slate-700">I have FSA</span>
                    </label>
                  </div>
                  {/* Annual deductible (HDHP or any insurance) */}
                  {input.insuranceProvider && input.insuranceProvider !== 'none' && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Annual Deductible ($)</label>
                        <input
                          type="number"
                          min="0"
                          step="100"
                          value={input.annualDeductible ?? ''}
                          onChange={(e) => updateInput({ annualDeductible: e.target.value ? Number(e.target.value) : undefined })}
                          placeholder="e.g. 2000"
                          className="mt-2 block w-full rounded-none border border-slate-300 px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <p className="mt-1 text-xs text-slate-500">Leave blank if not applicable (e.g. no deductible)</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Already Met This Year ($)</label>
                        <input
                          type="number"
                          min="0"
                          step="100"
                          value={input.deductibleRemaining ?? ''}
                          onChange={(e) => updateInput({ deductibleRemaining: e.target.value ? Number(e.target.value) : undefined })}
                          placeholder="e.g. 500"
                          className="mt-2 block w-full rounded-none border border-slate-300 px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <p className="mt-1 text-xs text-slate-500">Amount already paid toward deductible in 2026</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="mb-6 text-xl font-semibold text-slate-900">Step 3: Clinical Conditions</h2>
                <p className="mb-4 text-sm text-slate-600">
                  Select any conditions you have. This helps determine Prior Authorization (PA) approval probability.
                </p>
                <div className="space-y-3">
                  {COMORBIDITIES.map((comorbidity) => (
                    <button
                      key={comorbidity.value}
                      type="button"
                      onClick={() => {
                        const current = input.comorbidities || [];
                        if (comorbidity.value === 'none') {
                          updateInput({ comorbidities: [] });
                        } else {
                          const updated = current.includes(comorbidity.value)
                            ? current.filter((c) => c !== comorbidity.value)
                            : [...current.filter((c) => c !== 'none'), comorbidity.value];
                          updateInput({ comorbidities: updated });
                        }
                      }}
                      className={`w-full rounded-none border-2 p-4 text-left transition ${
                        (input.comorbidities || []).includes(comorbidity.value)
                          ? 'border-secondary-500 bg-secondary-50 text-secondary-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{comorbidity.label}</span>
                        {(input.comorbidities || []).includes(comorbidity.value) && (
                          <Check className="h-5 w-5 text-secondary-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="rounded-none border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-none bg-primary-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-600"
            >
              {step === 3 ? 'Calculate' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isCalculating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 rounded-none border border-slate-200 bg-white p-8 text-center"
          >
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-none border-4 border-primary-500 border-t-transparent" />
            <p className="text-slate-600">Retrieving 2026 insurance database...</p>
          </motion.div>
        )}

        {/* Results Dashboard */}
        {advancedResults && !isCalculating && useAdvancedView ? (
          <AdvancedResultsDashboard 
            results={advancedResults} 
            input={{
              insuranceProvider: input.insuranceProvider,
              state: input.state,
              hasHsa: input.hasHsa,
              hasFsa: input.hasFsa,
            }}
          />
        ) : results && !isCalculating ? (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Results</h2>
              {advancedResults && (
                <button
                  onClick={() => setUseAdvancedView(true)}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Switch to Advanced View →
                </button>
              )}
            </div>
            <ResultsDashboard results={results} input={input} />
          </div>
        ) : null}

        {/* Email Lead Magnet */}
        {results && !isCalculating && (
          <EmailLeadMagnet
            email={email}
            setEmail={setEmail}
            emailSubmitted={emailSubmitted}
            onSubmit={handleEmailSubmit}
          />
        )}
      </div>
    </div>
  );
}

function ResultsDashboard({
  results,
  input,
}: {
  results: ReturnType<typeof calculateScenarios>;
  input: CalculatorInput;
}) {
  const paResult = calculatePASuccess(input.comorbidities || [], input.insuranceProvider || 'none');
  const similarUsers = input.insuranceProvider && input.comorbidities
    ? getSimilarUsersStats(input.insuranceProvider, input.comorbidities)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 space-y-6"
    >
      <div className="rounded-none border border-slate-200 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Your Personalized Results</h2>
        
        {/* TrumpRx $350 Cap Notice */}
        {input.insuranceProvider === 'none' || input.insuranceProvider === 'other' ? (
          (() => {
            const trumpRxState = input.state ? getStateByCode(input.state) : null;
            const activeStates = getActiveStates();
            return (
              <div className="mb-6 rounded-none border-2 border-primary-500 bg-primary-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-none bg-secondary-500 p-1.5">
                    <span className="text-xs font-bold text-white">$</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary-900">2026 TrumpRx $350 Program</h3>
                    {trumpRxState && trumpRxState.status === 'active' ? (
                      <>
                        <p className="mt-1 text-sm font-medium text-secondary-800">
                          ✅ Available in {trumpRxState.stateName} - ${trumpRxState.monthlyCap}/month cap
                        </p>
                        {trumpRxState.effectiveDate && (
                          <p className="mt-1 text-xs text-secondary-600">
                            Effective: {new Date(trumpRxState.effectiveDate).toLocaleDateString()}
                          </p>
                        )}
                        {trumpRxState.applicationLink && (
                          <Link
                            href={trumpRxState.applicationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-xs font-medium text-secondary-600 underline hover:no-underline"
                          >
                            Apply for {trumpRxState.stateName} TrumpRx →
                          </Link>
                        )}
                      </>
                    ) : trumpRxState && trumpRxState.status === 'pending' ? (
                      <>
                        <p className="mt-1 text-sm text-secondary-800">
                          ⏳ Pending in {trumpRxState.stateName}
                        </p>
                        {trumpRxState.effectiveDate && (
                          <p className="mt-1 text-xs text-secondary-600">
                            Expected: {new Date(trumpRxState.effectiveDate).toLocaleDateString()}
                          </p>
                        )}
                        {trumpRxState.notes && (
                          <p className="mt-1 text-xs text-secondary-600">{trumpRxState.notes}</p>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="mt-1 text-sm text-secondary-800">
                          {activeStates.length} states currently offer the TrumpRx $350 program.
                        </p>
                        <Link
                          href="/trumprx"
                          className="mt-2 inline-block text-xs font-medium text-secondary-600 underline hover:no-underline"
                        >
                          Check if your state qualifies →
                        </Link>
                      </>
                    )}
                    <p className="mt-2 text-xs text-secondary-600">
                      Our calculator shows costs with TrumpRx subsidy applied where applicable.
                    </p>
                  </div>
                </div>
              </div>
            );
          })()
        ) : null}

        {similarUsers && (
          <div className="mb-6 rounded-none border border-primary-200 bg-primary-50 p-4">
            <p className="text-xs font-semibold text-primary-900 mb-1">📊 Similar Users Statistics</p>
            <p className="text-sm text-primary-800">
              {similarUsers.percentage}% of users with similar profile chose{' '}
              <strong>{similarUsers.mostChosenPath}</strong> path
            </p>
            <p className="text-xs text-primary-700 mt-1">
              Average monthly cost: <strong>${similarUsers.averageCost}</strong>
            </p>
          </div>
        )}

              {/* PA Success Chart */}
              <div className="mb-6">
                <PASuccessChart successRate={paResult.percent} level={paResult.level} />
              </div>

        <p className="mb-3 text-xs text-slate-500" role="note">
          We may earn a commission if you use certain links below. This does not change our editorial content.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {results.map((scenario, idx) => (
            <ScenarioCard key={idx} scenario={scenario} />
          ))}
        </div>

        {/* 按角色推荐下一步：有保险 → 折扣卡与申诉；无保险 → 替代方案 */}
        <div className="mt-8 rounded-none border-2 border-primary-200 bg-primary-50/50 p-5">
          <h3 className="text-base font-semibold text-slate-900">Based on your situation, your next step:</h3>
          {(input.insuranceProvider === 'none' || input.insuranceProvider === 'other') ? (
            <>
              <p className="mt-2 text-sm text-slate-600">
                You&apos;re uninsured or paying cash. Compare options and see discount programs or TrumpRx $350.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/alternatives"
                  className="inline-flex items-center justify-center rounded-none bg-secondary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-secondary-700"
                >
                  Compare alternatives
                </Link>
                <Link
                  href="/cost-insurance"
                  className="inline-flex items-center justify-center rounded-none border-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Discount cards & TrumpRx
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="mt-2 text-sm text-slate-600">
                You have insurance. See discount cards and appeal templates if you were denied.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/cost-insurance"
                  className="inline-flex items-center justify-center rounded-none bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
                >
                  Discount cards & appeals
                </Link>
                <Link
                  href="/alternatives"
                  className="inline-flex items-center justify-center rounded-none border-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Compare alternatives
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ScenarioCard({ scenario }: { scenario: ReturnType<typeof calculateScenarios>[0] }) {
  const isCompounded = scenario.name === 'Compounded';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className={`rounded-none border-2 p-6 ${
        isCompounded
          ? 'border-secondary-500 bg-secondary-50 shadow-lg'
          : 'border-slate-200 bg-white'
      }`}
    >
      {isCompounded && (
        <span className="mb-3 inline-block rounded-none bg-secondary-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Best Value
        </span>
      )}
      <h3 className="mb-4 text-lg font-bold text-slate-900">{scenario.name}</h3>

      <div className="mb-4 rounded-none bg-white/60 p-4 backdrop-blur-sm">
        <AnimatedNumber
          value={scenario.totalMonthly}
          prefix="$"
          className={`text-4xl font-extrabold ${
            isCompounded ? 'text-secondary-600' : 'text-primary-600'
          }`}
        />
        <p className="mt-1 text-xs font-medium text-slate-600">per month (total cost)</p>
      </div>

      <div className="mb-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600">Base medication:</span>
          <span className="font-medium">${scenario.monthlyCost}/mo</span>
        </div>
        {(scenario.hiddenCosts.consultation > 0 ||
          scenario.hiddenCosts.shipping > 0 ||
          scenario.hiddenCosts.membership > 0) && (
          <div className="border-t border-slate-200 pt-2">
            <p className="text-xs font-medium text-slate-700">Hidden costs:</p>
            {scenario.hiddenCosts.consultation > 0 && (
              <div className="flex justify-between text-xs text-slate-600">
                <span>Consultation:</span>
                <span>${scenario.hiddenCosts.consultation}</span>
              </div>
            )}
            {scenario.hiddenCosts.shipping > 0 && (
              <div className="flex justify-between text-xs text-slate-600">
                <span>Shipping:</span>
                <span>${scenario.hiddenCosts.shipping}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {scenario.annualSavings > 0 && (
        <div className="mb-4 space-y-4">
          <SavingsVisualization 
            annualSavings={scenario.annualSavings} 
            totalCost={scenario.totalMonthly * 12}
          />
          <CostSavingsInfographic 
            data={{
              monthlySavings: scenario.annualSavings / 12,
              annualSavings: scenario.annualSavings,
              savingsPercentage: Math.round((scenario.annualSavings / (scenario.totalMonthly * 12)) * 100),
            }}
          />
        </div>
      )}

      <div className="mb-4">
        <p className="mb-1 text-xs font-medium text-slate-700">PA Success: {scenario.paProbability}</p>
        <div className="h-1.5 overflow-hidden rounded-none bg-slate-200">
          <motion.div
            className="h-full bg-secondary-500"
            initial={{ width: 0 }}
            animate={{ width: `${scenario.paProbabilityPercent}%` }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-1 text-xs font-medium text-slate-700">Ease of Access</p>
        <div className="flex gap-1">
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

      <ul className="mb-4 space-y-1 text-xs text-slate-600">
        {scenario.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary-500" />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={scenario.ctaLink}
        className={`block w-full rounded-none px-4 py-2.5 text-center text-sm font-medium transition ${
          isCompounded
            ? 'bg-secondary-500 text-white hover:bg-secondary-600'
            : 'bg-primary-500 text-white hover:bg-primary-600'
        }`}
      >
        {scenario.cta}
      </a>
    </motion.div>
  );
}

function AnimatedNumber({
  value,
  prefix = '',
  className = '',
}: {
  value: number;
  prefix?: string;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className={className}>
      {prefix}
      {displayValue.toLocaleString()}
    </span>
  );
}

function EmailLeadMagnet({
  email,
  setEmail,
  emailSubmitted,
  onSubmit,
}: {
  email: string;
  setEmail: (v: string) => void;
  emailSubmitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  if (emailSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-none border-2 border-primary-500 bg-primary-50 p-6 text-center"
      >
        <Check className="mx-auto mb-2 h-12 w-12 text-secondary-500" />
        <h3 className="mb-2 text-lg font-bold text-secondary-900">Thank you!</h3>
        <p className="text-sm text-secondary-600">
          Your 2026 Coverage Report will be sent to your email shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-none border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-white p-6 shadow-lg"
    >
      <h3 className="mb-2 text-xl font-bold text-slate-900">Get Your Custom 2026 Coverage Report</h3>
      <p className="mb-4 text-sm text-slate-600">
        Receive a detailed PDF with your personalized cost breakdown, PA success strategies, and next steps.
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          required
          className="flex-1 rounded-none border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          className="rounded-none bg-primary-600 px-6 py-2.5 font-medium text-white hover:bg-primary-700"
        >
          Get Report
        </button>
      </form>
      <p className="mt-2 text-xs text-slate-500">We&apos;ll never spam you. Unsubscribe anytime.</p>
    </motion.div>
  );
}
