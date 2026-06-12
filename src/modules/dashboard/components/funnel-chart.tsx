"use client";

interface FunnelItem {
  label: string;
  value: number;
  max: number;
  color: string;
}

interface FunnelChartProps {
  data: FunnelItem[];
}

export const FunnelChart = ({ data }: FunnelChartProps) => {
  return (
    <div className="flex flex-col gap-3">
      {data.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">{item.label}</span>
            <span className="font-semibold text-text-base">{item.value}</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min((item.value / item.max) * 100, 100)}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
