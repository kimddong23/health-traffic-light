import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import TrafficLight from './TrafficLight';
import type { HealthCheckup } from '../types/health';

interface HealthSummaryCardProps {
  checkup: HealthCheckup;
}

export default function HealthSummaryCard({ checkup }: HealthSummaryCardProps) {
  const ageDiff = checkup.healthAge - checkup.actualAge;

  const getAgeTrend = () => {
    if (ageDiff > 0) {
      return {
        icon: TrendingUp,
        text: `실제 나이보다 ${ageDiff}세 높음`,
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
      };
    } else if (ageDiff < 0) {
      return {
        icon: TrendingDown,
        text: `실제 나이보다 ${Math.abs(ageDiff)}세 낮음`,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
      };
    }
    return {
      icon: Minus,
      text: '실제 나이와 동일',
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
    };
  };

  const trend = getAgeTrend();
  const TrendIcon = trend.icon;

  const statusCounts = {
    safe: checkup.metrics.filter(m => m.status === 'safe').length,
    caution: checkup.metrics.filter(m => m.status === 'caution').length,
    danger: checkup.metrics.filter(m => m.status === 'danger').length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl"
    >
      {/* 상단 섹션 */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-slate-400 text-sm mb-1">나의 건강 상태</p>
          <h2 className="text-2xl font-bold">
            {checkup.overallStatus === 'safe' && '양호'}
            {checkup.overallStatus === 'caution' && '주의 필요'}
            {checkup.overallStatus === 'danger' && '관리 필요'}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {new Date(checkup.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })} 검진 기준
          </p>
        </div>
        <TrafficLight status={checkup.overallStatus} size="lg" animated />
      </div>

      {/* 건강 나이 섹션 */}
      <div className="bg-white/10 rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-300 text-sm">건강 나이</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-bold">{checkup.healthAge}</span>
              <span className="text-slate-400">세</span>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${trend.bgColor}`}>
            <TrendIcon className={trend.color} size={18} />
            <span className={`text-sm font-medium ${trend.color}`}>{trend.text}</span>
          </div>
        </div>
      </div>

      {/* 지표 요약 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-emerald-500/20 rounded-xl p-3 text-center">
          <p className="text-emerald-300 text-xs">안전</p>
          <p className="text-2xl font-bold text-emerald-400">{statusCounts.safe}</p>
        </div>
        <div className="bg-amber-500/20 rounded-xl p-3 text-center">
          <p className="text-amber-300 text-xs">주의</p>
          <p className="text-2xl font-bold text-amber-400">{statusCounts.caution}</p>
        </div>
        <div className="bg-red-500/20 rounded-xl p-3 text-center">
          <p className="text-red-300 text-xs">위험</p>
          <p className="text-2xl font-bold text-red-400">{statusCounts.danger}</p>
        </div>
      </div>
    </motion.div>
  );
}
