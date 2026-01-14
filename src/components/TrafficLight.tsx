import { motion } from 'framer-motion';
import type { HealthStatus } from '../types/health';

interface TrafficLightProps {
  status: HealthStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

const statusConfig = {
  safe: {
    label: '안전',
    color: 'bg-emerald-500',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    textColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  caution: {
    label: '주의',
    color: 'bg-amber-500',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  danger: {
    label: '위험',
    color: 'bg-red-500',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    textColor: 'text-red-600',
    bgColor: 'bg-red-50',
  },
};

const sizeConfig = {
  sm: { light: 'w-4 h-4', container: 'p-1.5 gap-1.5', text: 'text-xs' },
  md: { light: 'w-6 h-6', container: 'p-2 gap-2', text: 'text-sm' },
  lg: { light: 'w-8 h-8', container: 'p-3 gap-3', text: 'text-base' },
};

export default function TrafficLight({
  status,
  size = 'md',
  showLabel = false,
  animated = true,
}: TrafficLightProps) {
  const config = statusConfig[status];
  const sizes = sizeConfig[size];

  const lights: HealthStatus[] = ['danger', 'caution', 'safe'];

  return (
    <div className="flex items-center gap-2">
      <div className={`flex flex-col ${sizes.container} bg-slate-800 rounded-full`}>
        {lights.map((lightStatus) => {
          const isActive = lightStatus === status;
          const lightConfig = statusConfig[lightStatus];

          return (
            <motion.div
              key={lightStatus}
              className={`${sizes.light} rounded-full ${
                isActive ? lightConfig.color : 'bg-slate-600'
              }`}
              initial={false}
              animate={
                isActive && animated
                  ? {
                      boxShadow: [
                        `0 0 10px ${lightConfig.glowColor}`,
                        `0 0 25px ${lightConfig.glowColor}`,
                        `0 0 10px ${lightConfig.glowColor}`,
                      ],
                    }
                  : { boxShadow: 'none' }
              }
              transition={
                animated
                  ? {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : undefined
              }
            />
          );
        })}
      </div>
      {showLabel && (
        <span className={`font-semibold ${sizes.text} ${config.textColor}`}>
          {config.label}
        </span>
      )}
    </div>
  );
}
