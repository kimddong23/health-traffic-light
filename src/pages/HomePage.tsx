import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, ChevronRight, Activity, TrendingUp } from 'lucide-react';
import HealthSummaryCard from '../components/HealthSummaryCard';
import HealthCard from '../components/HealthCard';
import ActivityCard from '../components/ActivityCard';
import AlertCard from '../components/AlertCard';
import { latestCheckup, healthAlerts, activityData, userProfile } from '../data/mockData';

export default function HomePage() {
  const unreadAlerts = healthAlerts.filter((a) => !a.isRead);
  const cautionMetrics = latestCheckup.metrics.filter((m) => m.status !== 'safe');
  const todayActivity = activityData[activityData.length - 1];

  return (
    <div className="min-h-screen">
      {/* 헤더 */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">안녕하세요</p>
            <h1 className="text-xl font-bold text-slate-900">{userProfile.name}님</h1>
          </div>
          <Link
            to="/alerts"
            className="relative p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <Bell size={24} className="text-slate-700" />
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadAlerts.length}
              </span>
            )}
          </Link>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* 건강 요약 카드 */}
        <HealthSummaryCard checkup={latestCheckup} />

        {/* 주의 필요 알림 */}
        {unreadAlerts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-slate-800">주의 알림</h2>
              <Link
                to="/alerts"
                className="flex items-center gap-1 text-sm text-primary-600 font-medium"
              >
                전체보기
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="space-y-2">
              {unreadAlerts.slice(0, 2).map((alert, index) => (
                <AlertCard key={alert.id} alert={alert} index={index} compact />
              ))}
            </div>
          </section>
        )}

        {/* 오늘의 활동 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Activity size={18} className="text-primary-500" />
              오늘의 활동
            </h2>
          </div>
          <ActivityCard data={todayActivity} />
        </section>

        {/* 주의가 필요한 지표 */}
        {cautionMetrics.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp size={18} className="text-amber-500" />
                관리가 필요한 지표
              </h2>
              <Link
                to="/checkup"
                className="flex items-center gap-1 text-sm text-primary-600 font-medium"
              >
                전체보기
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="space-y-3">
              {cautionMetrics.slice(0, 3).map((metric, index) => (
                <HealthCard key={metric.id} metric={metric} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* 빠른 액션 */}
        <section>
          <h2 className="font-bold text-slate-800 mb-3">빠른 액션</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/hospitals"
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 card-hover"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <p className="font-semibold text-slate-800">병원 찾기</p>
                <p className="text-xs text-slate-500 mt-0.5">내 주변 병원</p>
              </motion.div>
            </Link>

            <Link
              to="/checkup"
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 card-hover"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p className="font-semibold text-slate-800">검진 결과</p>
                <p className="text-xs text-slate-500 mt-0.5">상세 분석</p>
              </motion.div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
