'use client';

import { DollarSign, TrendingDown, Percent, Calendar } from 'lucide-react';

interface SavingsData {
  monthlySavings: number;
  annualSavings: number;
  savingsPercentage: number;
  monthsToBreakEven?: number;
}

export default function CostSavingsInfographic({ data }: { data: SavingsData }) {
  return (
    <div className="rounded-none border-2 border-secondary-100 bg-gradient-to-br from-white via-secondary-50/30 to-white p-6 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-gray-900">Your Savings Breakdown</h3>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Monthly Savings */}
        <div className="rounded-none border-2 border-secondary-200 bg-white p-5 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-none bg-secondary-100">
            <DollarSign className="h-6 w-6 text-secondary-600" />
          </div>
          <p className="text-2xl font-bold text-secondary-600">${data.monthlySavings.toLocaleString()}</p>
          <p className="mt-1 text-xs font-medium text-gray-600">Monthly Savings</p>
        </div>
        
        {/* Annual Savings */}
        <div className="rounded-none border-2 border-secondary-300 bg-gradient-to-br from-secondary-50 to-secondary-100/50 p-5 text-center shadow-md">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-none bg-secondary-500">
            <TrendingDown className="h-6 w-6 text-white" />
          </div>
          <p className="text-3xl font-bold text-secondary-700">${data.annualSavings.toLocaleString()}</p>
          <p className="mt-1 text-xs font-semibold text-secondary-700">Annual Savings</p>
        </div>
        
        {/* Savings Percentage */}
        <div className="rounded-none border-2 border-primary-200 bg-white p-5 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-none bg-primary-100">
            <Percent className="h-6 w-6 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-primary-600">{data.savingsPercentage}%</p>
          <p className="mt-1 text-xs font-medium text-gray-600">Savings Rate</p>
        </div>
        
        {/* Break Even */}
        {data.monthsToBreakEven && (
          <div className="rounded-none border-2 border-accent-amber-200 bg-white p-5 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-none bg-accent-amber-100">
              <Calendar className="h-6 w-6 text-accent-amber-600" />
            </div>
            <p className="text-2xl font-bold text-accent-amber-600">{data.monthsToBreakEven}</p>
            <p className="mt-1 text-xs font-medium text-gray-600">Months to Break Even</p>
          </div>
        )}
      </div>
      
      {/* Visual Bar */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-600">
          <span>Original Cost</span>
          <span>With Savings</span>
        </div>
        <div className="relative h-8 overflow-hidden rounded-none bg-gray-200">
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-secondary-500 to-secondary-600 transition-all duration-1000"
            style={{ width: `${data.savingsPercentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow-sm">
              Save {data.savingsPercentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
