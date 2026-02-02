'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface PriceComparisonChartProps {
  data: Array<{
    name: string;
    brand: number;
    compounded: number;
    oral: number;
  }>;
}

export default function PriceComparisonChart({ data }: PriceComparisonChartProps) {
  return (
    <div className="w-full rounded-none border-2 border-primary-100 bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-bold text-gray-900">Monthly Cost Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px'
            }}
            formatter={(value: number | undefined) => value !== undefined ? `$${value.toLocaleString()}` : ''}
          />
          <Legend />
          <Bar dataKey="brand" name="Brand Name" fill="#0EA5E9" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-brand-${index}`} fill="#0EA5E9" />
            ))}
          </Bar>
          <Bar dataKey="compounded" name="Compounded" fill="#10B981" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-compounded-${index}`} fill="#10B981" />
            ))}
          </Bar>
          <Bar dataKey="oral" name="Oral Pills" fill="#14B8A6" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-oral-${index}`} fill="#14B8A6" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
