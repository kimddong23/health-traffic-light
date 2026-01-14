import type { HealthStatus } from '../types/health';

interface StatusBadgeProps {
  status: HealthStatus;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  safe: {
    label: '안전',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    dotColor: 'bg-emerald-500',
  },
  caution: {
    label: '주의',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
    dotColor: 'bg-amber-500',
  },
  danger: {
    label: '위험',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
    dotColor: 'bg-red-500',
  },
};

const sizeConfig = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClass = sizeConfig[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bgColor} ${config.textColor} ${sizeClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
}
