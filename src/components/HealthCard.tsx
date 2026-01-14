import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import type { HealthMetric } from '../types/health';

interface HealthCardProps {
  metric: HealthMetric;
  index?: number;
}

export default function HealthCard({ metric, index = 0 }: HealthCardProps) {
  const getProgressWidth = () => {
    const { value, cautionRange } = metric;
    const maxValue = cautionRange.max * 1.2;
    const percentage = Math.min((value / maxValue) * 100, 100);
    return `${percentage}%`;
  };

  const getProgressColor = () => {
    switch (metric.status) {
      case 'safe':
        return 'bg-emerald-500';
      case 'caution':
        return 'bg-amber-500';
      case 'danger':
        return 'bg-red-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/checkup/${metric.id}`}
        className="block bg-white rounded-2xl p-4 shadow-sm border border-slate-100 card-hover"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-slate-800">{metric.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              정상: {metric.normalRange.min}-{metric.normalRange.max} {metric.unit}
            </p>
          </div>
          <StatusBadge status={metric.status} size="sm" />
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-slate-900">{metric.value}</span>
            <span className="text-sm text-slate-500 ml-1">{metric.unit}</span>
          </div>
          <ChevronRight className="text-slate-400" size={20} />
        </div>

        {/* 진행 바 */}
        <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${getProgressColor()}`}
            initial={{ width: 0 }}
            animate={{ width: getProgressWidth() }}
            transition={{ duration: 0.8, delay: index * 0.05 + 0.2 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
