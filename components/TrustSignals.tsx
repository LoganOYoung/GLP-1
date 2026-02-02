'use client';

import { Shield, CheckCircle2, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Trust Signals Component
 * 
 * Displays social proof and trust indicators to increase conversion.
 * Based on blueprint: "建立信任绿洲" (Build Trust Oasis)
 */
export default function TrustSignals() {
  const stats = [
    { icon: Shield, value: '100%', label: 'LegitScript Verified', color: 'secondary' },
    { icon: Users, value: '50K+', label: 'Users Helped', color: 'primary' },
    { icon: CheckCircle2, value: '2026', label: 'Policy Updated', color: 'secondary' },
    { icon: Clock, value: 'Live', label: 'Real-Time Data', color: 'primary' },
  ];

  return (
    <div className="rounded-none border-2 border-primary-100 bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 p-6 shadow-md">
      <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-primary-700">
        Trusted by Thousands
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const bgColor = stat.color === 'secondary' ? 'bg-secondary-100' : 'bg-primary-100';
          const iconColor = stat.color === 'secondary' ? 'text-secondary-500' : 'text-primary-500';
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-3 rounded-none bg-white/60 p-4 backdrop-blur-sm"
            >
              <div className={`rounded-none ${bgColor} p-3 shadow-sm`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
