'use client';

import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, Cell } from 'recharts';
import { CheckCircle2 } from 'lucide-react';

interface PASuccessChartProps {
  successRate: number;
  level: string;
}

export default function PASuccessChart({ successRate, level }: PASuccessChartProps) {
  const data = [
    { name: 'Success', value: successRate, fill: '#10B981' },
    { name: 'Remaining', value: 100 - successRate, fill: '#E5E7EB' },
  ];

  const getLevelColor = () => {
    if (successRate >= 70) return { text: 'text-secondary-600', bg: 'bg-secondary-50' };
    if (successRate >= 40) return { text: 'text-accent-amber-600', bg: 'bg-accent-amber-50' };
    return { text: 'text-accent-red-600', bg: 'bg-accent-red-50' };
  };
  
  const levelColor = getLevelColor();

  return (
    <div className="rounded-none border-2 border-primary-100 bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-none bg-primary-100 p-2">
          <CheckCircle2 className="h-5 w-5 text-primary-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Prior Authorization Success</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar dataKey="value" cornerRadius={10}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </RadialBar>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <div className="text-center">
            <p className="text-5xl font-bold text-primary-500">{successRate}%</p>
            <p className="text-sm text-gray-600 mt-1">Success Probability</p>
          </div>
          <div className={`rounded-none p-4 ${levelColor.bg}`}>
            <p className={`text-sm font-semibold ${levelColor.text}`}>Level: {level}</p>
            <p className="text-xs text-gray-600 mt-1">
              {successRate >= 70 
                ? 'High probability of approval'
                : successRate >= 40
                ? 'Moderate probability'
                : 'Lower probability - consider alternatives'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
