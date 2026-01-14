import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';
import type { MetricHistory } from '../types/health';

interface TrendChartProps {
  data: MetricHistory;
  normalRange: { min: number; max: number };
  cautionRange: { min: number; max: number };
}

export default function TrendChart({ data, normalRange, cautionRange }: TrendChartProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return '#10b981';
      case 'caution':
        return '#f59e0b';
      case 'danger':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const chartData = data.history.map((item) => ({
    ...item,
    color: getStatusColor(item.status),
  }));

  const minValue = Math.min(...data.history.map((h) => h.value), normalRange.min) * 0.9;
  const maxValue = Math.max(...data.history.map((h) => h.value), cautionRange.max) * 1.1;

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { date: string; value: number; status: string } }> }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-3">
          <p className="text-sm text-slate-500">{item.date}</p>
          <p className="text-lg font-bold text-slate-800">
            {item.value} {data.unit}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getStatusColor(item.status) }}
            />
            <span className="text-xs" style={{ color: getStatusColor(item.status) }}>
              {item.status === 'safe' ? '안전' : item.status === 'caution' ? '주의' : '위험'}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#64748b' }}
            tickLine={false}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis
            domain={[minValue, maxValue]}
            tick={{ fontSize: 11, fill: '#64748b' }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />

          {/* 정상 범위 영역 */}
          <ReferenceLine
            y={normalRange.max}
            stroke="#10b981"
            strokeDasharray="5 5"
            strokeOpacity={0.5}
          />
          <ReferenceLine
            y={cautionRange.max}
            stroke="#f59e0b"
            strokeDasharray="5 5"
            strokeOpacity={0.5}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="none"
            fill="url(#colorGradient)"
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={(props) => {
              const { cx, cy, payload } = props;
              return (
                <circle
                  key={payload.date}
                  cx={cx}
                  cy={cy}
                  r={6}
                  fill={getStatusColor(payload.status)}
                  stroke="white"
                  strokeWidth={2}
                />
              );
            }}
            activeDot={{ r: 8, strokeWidth: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
