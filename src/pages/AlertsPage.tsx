import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Check, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AlertCard from '../components/AlertCard';
import { healthAlerts } from '../data/mockData';
import type { HealthAlert } from '../types/health';

export default function AlertsPage() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<HealthAlert[]>(healthAlerts);

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  const markAllAsRead = () => {
    setAlerts((prev) =>
      prev.map((alert) => ({ ...alert, isRead: true }))
    );
  };

  const deleteReadAlerts = () => {
    setAlerts((prev) => prev.filter((alert) => !alert.isRead));
  };

  const markAsRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, isRead: true } : alert
      )
    );
  };

  const groupedAlerts = {
    today: alerts.filter((a) => {
      const today = new Date();
      const alertDate = new Date(a.date);
      return alertDate.toDateString() === today.toDateString();
    }),
    earlier: alerts.filter((a) => {
      const today = new Date();
      const alertDate = new Date(a.date);
      return alertDate.toDateString() !== today.toDateString();
    }),
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
            <h1 className="text-lg font-bold text-slate-900">알림</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-primary-600">{unreadCount}개의 새 알림</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <Check size={16} />
              모두 읽음
            </button>
          )}
        </div>
      </header>

      <div className="px-4 py-6">
        {alerts.length > 0 ? (
          <div className="space-y-6">
            {/* 오늘 */}
            {groupedAlerts.today.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-slate-500 mb-3">오늘</h2>
                <div className="space-y-3">
                  {groupedAlerts.today.map((alert, index) => (
                    <div
                      key={alert.id}
                      onClick={() => markAsRead(alert.id)}
                    >
                      <AlertCard alert={alert} index={index} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 이전 알림 */}
            {groupedAlerts.earlier.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-slate-500 mb-3">이전</h2>
                <div className="space-y-3">
                  {groupedAlerts.earlier.map((alert, index) => (
                    <div
                      key={alert.id}
                      onClick={() => markAsRead(alert.id)}
                    >
                      <AlertCard alert={alert} index={index} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 읽은 알림 삭제 */}
            {alerts.some((a) => a.isRead) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-4 border-t border-slate-200"
              >
                <button
                  onClick={deleteReadAlerts}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                  읽은 알림 삭제
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={40} className="text-slate-400" />
            </div>
            <p className="text-slate-500">알림이 없습니다.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
