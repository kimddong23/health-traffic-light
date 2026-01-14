import { motion } from 'framer-motion';
import { Footprints, Flame, Clock, Target } from 'lucide-react';
import type { ActivityData } from '../types/health';

interface ActivityCardProps {
  data: ActivityData;
  dailyGoal?: number;
}

export default function ActivityCard({ data, dailyGoal = 8000 }: ActivityCardProps) {
  const progress = Math.min((data.steps / dailyGoal) * 100, 100);
  const isGoalMet = data.steps >= dailyGoal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">오늘의 활동</h3>
        <div className="flex items-center gap-1 text-sm">
          <Target size={16} className={isGoalMet ? 'text-emerald-500' : 'text-slate-400'} />
          <span className={isGoalMet ? 'text-emerald-600 font-medium' : 'text-slate-500'}>
            {isGoalMet ? '목표 달성' : `${dailyGoal.toLocaleString()}보 목표`}
          </span>
        </div>
      </div>

      {/* 걸음 수 원형 차트 */}
      <div className="flex items-center gap-6 mb-5">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#e2e8f0"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              stroke={isGoalMet ? '#10b981' : '#3b82f6'}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={251.2}
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * progress) / 100 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Footprints className="text-primary-500 mb-1" size={20} />
            <span className="text-xs text-slate-500">{Math.round(progress)}%</span>
          </div>
        </div>

        <div>
          <p className="text-3xl font-bold text-slate-900">
            {data.steps.toLocaleString()}
          </p>
          <p className="text-sm text-slate-500">걸음</p>
        </div>
      </div>

      {/* 활동 상세 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center text-blue-500 mb-1">
            <Footprints size={18} />
          </div>
          <p className="text-lg font-semibold text-slate-800">{data.distance}</p>
          <p className="text-xs text-slate-500">km</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center text-orange-500 mb-1">
            <Flame size={18} />
          </div>
          <p className="text-lg font-semibold text-slate-800">{data.calories}</p>
          <p className="text-xs text-slate-500">kcal</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center text-emerald-500 mb-1">
            <Clock size={18} />
          </div>
          <p className="text-lg font-semibold text-slate-800">{data.activeMinutes}</p>
          <p className="text-xs text-slate-500">분</p>
        </div>
      </div>
    </motion.div>
  );
}
