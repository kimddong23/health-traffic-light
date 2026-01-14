import { motion } from 'framer-motion';
import { AlertTriangle, Info, AlertCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { HealthAlert } from '../types/health';

interface AlertCardProps {
  alert: HealthAlert;
  index?: number;
  compact?: boolean;
}

const typeConfig = {
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    iconColor: 'text-amber-500',
    textColor: 'text-amber-800',
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-500',
    textColor: 'text-blue-800',
  },
  urgent: {
    icon: AlertCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-500',
    textColor: 'text-red-800',
  },
};

export default function AlertCard({ alert, index = 0, compact = false }: AlertCardProps) {
  const config = typeConfig[alert.type];
  const Icon = config.icon;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '어제';
    if (diffDays < 7) return `${diffDays}일 전`;
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`${config.bgColor} ${config.borderColor} border rounded-xl ${
        compact ? 'p-3' : 'p-4'
      } ${!alert.isRead ? 'ring-2 ring-offset-2 ring-primary-200' : ''} card-hover`}
    >
      <div className="flex items-start gap-3">
        <div className={`${config.iconColor} mt-0.5`}>
          <Icon size={compact ? 18 : 20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`font-semibold ${config.textColor} ${compact ? 'text-sm' : ''}`}>
              {alert.title}
              {!alert.isRead && (
                <span className="ml-2 inline-block w-2 h-2 bg-primary-500 rounded-full" />
              )}
            </h4>
            <span className="text-xs text-slate-500 whitespace-nowrap">
              {formatDate(alert.date)}
            </span>
          </div>
          {!compact && (
            <p className="text-sm text-slate-600 mt-1 line-clamp-2">{alert.message}</p>
          )}
        </div>
        {alert.actionUrl && (
          <ChevronRight className="text-slate-400 flex-shrink-0" size={18} />
        )}
      </div>
    </motion.div>
  );

  if (alert.actionUrl) {
    return <Link to={alert.actionUrl}>{content}</Link>;
  }

  return content;
}
