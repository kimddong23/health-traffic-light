import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HealthCard from '../components/HealthCard';
import StatusBadge from '../components/StatusBadge';
import { latestCheckup } from '../data/mockData';
import type { HealthStatus } from '../types/health';

type FilterType = 'all' | HealthStatus;

export default function CheckupPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('all');
  const [showFilter, setShowFilter] = useState(false);

  const filteredMetrics = latestCheckup.metrics.filter((metric) => {
    if (filter === 'all') return true;
    return metric.status === filter;
  });

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: '전체' },
    { value: 'danger', label: '위험' },
    { value: 'caution', label: '주의' },
    { value: 'safe', label: '안전' },
  ];

  const statusCounts = {
    all: latestCheckup.metrics.length,
    safe: latestCheckup.metrics.filter(m => m.status === 'safe').length,
    caution: latestCheckup.metrics.filter(m => m.status === 'caution').length,
    danger: latestCheckup.metrics.filter(m => m.status === 'danger').length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1 -ml-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900">건강검진 결과</h1>
            <p className="text-sm text-slate-500">
              {new Date(latestCheckup.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-4">
        {/* 요약 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">검진 요약</h2>
            <StatusBadge status={latestCheckup.overallStatus} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setFilter(filter === 'safe' ? 'all' : 'safe')}
              className={`p-3 rounded-xl text-center transition-all ${
                filter === 'safe'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <p className={`text-xs ${filter === 'safe' ? 'text-emerald-100' : 'text-emerald-600'}`}>
                안전
              </p>
              <p className={`text-2xl font-bold ${filter === 'safe' ? 'text-white' : 'text-emerald-700'}`}>
                {statusCounts.safe}
              </p>
            </button>
            <button
              onClick={() => setFilter(filter === 'caution' ? 'all' : 'caution')}
              className={`p-3 rounded-xl text-center transition-all ${
                filter === 'caution'
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-50 hover:bg-amber-100'
              }`}
            >
              <p className={`text-xs ${filter === 'caution' ? 'text-amber-100' : 'text-amber-600'}`}>
                주의
              </p>
              <p className={`text-2xl font-bold ${filter === 'caution' ? 'text-white' : 'text-amber-700'}`}>
                {statusCounts.caution}
              </p>
            </button>
            <button
              onClick={() => setFilter(filter === 'danger' ? 'all' : 'danger')}
              className={`p-3 rounded-xl text-center transition-all ${
                filter === 'danger'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-50 hover:bg-red-100'
              }`}
            >
              <p className={`text-xs ${filter === 'danger' ? 'text-red-100' : 'text-red-600'}`}>
                위험
              </p>
              <p className={`text-2xl font-bold ${filter === 'danger' ? 'text-white' : 'text-red-700'}`}>
                {statusCounts.danger}
              </p>
            </button>
          </div>
        </motion.div>

        {/* 필터 */}
        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm font-medium text-slate-700"
          >
            <Filter size={16} />
            {filterOptions.find((o) => o.value === filter)?.label}
            <ChevronDown
              size={16}
              className={`transition-transform ${showFilter ? 'rotate-180' : ''}`}
            />
          </button>

          {showFilter && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20 min-w-[120px]"
            >
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFilter(option.value);
                    setShowFilter(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${
                    filter === option.value
                      ? 'text-primary-600 font-medium bg-primary-50'
                      : 'text-slate-700'
                  }`}
                >
                  {option.label} ({statusCounts[option.value]})
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* 검진 항목 목록 */}
        <div className="space-y-3">
          {filteredMetrics.length > 0 ? (
            filteredMetrics.map((metric, index) => (
              <HealthCard key={metric.id} metric={metric} index={index} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">해당하는 검진 항목이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
