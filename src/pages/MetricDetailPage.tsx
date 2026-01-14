import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, AlertCircle, Lightbulb, MapPin } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import TrendChart from '../components/TrendChart';
import { latestCheckup, metricHistories } from '../data/mockData';

export default function MetricDetailPage() {
  const { metricId } = useParams<{ metricId: string }>();
  const navigate = useNavigate();

  const metric = latestCheckup.metrics.find((m) => m.id === metricId);
  const history = metricHistories.find((h) => h.metricId === metricId);

  if (!metric) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">해당 검진 항목을 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/checkup')}
            className="text-primary-600 font-medium"
          >
            검진 결과로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const getStatusText = () => {
    switch (metric.status) {
      case 'safe':
        return '정상 범위입니다.';
      case 'caution':
        return '건강 관리가 필요한 주의 단계입니다.';
      case 'danger':
        return '전문의 상담을 권장합니다.';
    }
  };

  const getGradientClass = () => {
    switch (metric.status) {
      case 'safe':
        return 'from-emerald-500 to-emerald-600';
      case 'caution':
        return 'from-amber-500 to-amber-600';
      case 'danger':
        return 'from-red-500 to-red-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <header className={`bg-gradient-to-r ${getGradientClass()} text-white`}>
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1 -ml-1 rounded-lg hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold">{metric.name}</h1>
        </div>

        <div className="px-4 pb-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">현재 수치</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{metric.value}</span>
                <span className="text-white/80">{metric.unit}</span>
              </div>
            </div>
            <StatusBadge status={metric.status} size="lg" />
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-4">
        {/* 상태 안내 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full ${
              metric.status === 'safe' ? 'bg-emerald-100' :
              metric.status === 'caution' ? 'bg-amber-100' : 'bg-red-100'
            }`}>
              <AlertCircle
                size={20}
                className={
                  metric.status === 'safe' ? 'text-emerald-600' :
                  metric.status === 'caution' ? 'text-amber-600' : 'text-red-600'
                }
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">상태 안내</h3>
              <p className="text-sm text-slate-600">{getStatusText()}</p>
              <p className="text-sm text-slate-500 mt-2">{metric.description}</p>
            </div>
          </div>
        </motion.div>

        {/* 기준 범위 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
        >
          <h3 className="font-semibold text-slate-800 mb-3">기준 범위</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-slate-700">정상</span>
              </div>
              <span className="text-sm font-medium text-slate-800">
                {metric.normalRange.min} - {metric.normalRange.max} {metric.unit}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-700">주의</span>
              </div>
              <span className="text-sm font-medium text-slate-800">
                {metric.cautionRange.min} - {metric.cautionRange.max} {metric.unit}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm text-slate-700">위험</span>
              </div>
              <span className="text-sm font-medium text-slate-800">
                {metric.cautionRange.max} {metric.unit} 이상
              </span>
            </div>
          </div>
        </motion.div>

        {/* 추세 그래프 */}
        {history && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className="text-primary-500" />
              <h3 className="font-semibold text-slate-800">10년 추세</h3>
            </div>
            <TrendChart
              data={history}
              normalRange={metric.normalRange}
              cautionRange={metric.cautionRange}
            />
          </motion.div>
        )}

        {/* 건강 관리 조언 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-primary-50 rounded-2xl p-4 border border-primary-100"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary-100">
              <Lightbulb size={20} className="text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-800 mb-1">건강 관리 조언</h3>
              <p className="text-sm text-primary-700">{metric.advice}</p>
            </div>
          </div>
        </motion.div>

        {/* 병원 찾기 버튼 */}
        {metric.status !== 'safe' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/hospitals"
              className="flex items-center justify-center gap-2 w-full py-4 bg-primary-500 text-white rounded-2xl font-semibold hover:bg-primary-600 transition-colors"
            >
              <MapPin size={20} />
              주변 병원 찾기
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
