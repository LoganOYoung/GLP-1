'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DollarSign } from 'lucide-react';

interface SavingsVisualizationProps {
  annualSavings: number;
  totalCost: number;
}

export default function SavingsVisualization({ annualSavings, totalCost }: SavingsVisualizationProps) {
  const data = [
    { name: 'Annual Savings', value: annualSavings, color: '#10B981' },
    { name: 'Total Cost', value: totalCost - annualSavings, color: '#E5E7EB' },
  ];

  const savingsPercentage = ((annualSavings / totalCost) * 100).toFixed(1);

  return (
    <div className="rounded-none border-2 border-secondary-100 bg-gradient-to-br from-white to-secondary-50/30 p-6 shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-none bg-secondary-100 p-2">
          <DollarSign className="h-5 w-5 text-secondary-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Annual Savings Breakdown</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number | undefined) => value !== undefined ? `$${value.toLocaleString()}` : ''}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <div className="rounded-none bg-secondary-100 p-4">
            <p className="text-sm font-medium text-secondary-700">You Save</p>
            <p className="text-3xl font-bold text-secondary-600">${annualSavings.toLocaleString()}</p>
            <p className="text-xs text-secondary-600 mt-1">per year</p>
          </div>
          <div className="rounded-none bg-primary-50 p-4">
            <p className="text-sm font-medium text-primary-700">Savings Rate</p>
            <p className="text-2xl font-bold text-primary-600">{savingsPercentage}%</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-none bg-secondary-500"></div>
          <span className="text-xs text-gray-600">Savings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-none bg-gray-300"></div>
          <span className="text-xs text-gray-600">Cost</span>
        </div>
      </div>
    </div>
  );
}
