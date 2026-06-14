import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  badge?: string;
  badgeVariant?: "green" | "blue" | "red" | "gray";
}

export const StatCard = ({
  label,
  value,
  badge,
  badgeVariant = "gray",
}: StatCardProps) => {
  const badgeColors = {
    green: "bg-warm/10 text-warm",
    blue: "bg-primary-light text-primary",
    red: "bg-danger-light text-danger",
    gray: "bg-gray-100 text-text-muted",
  };

  return (
    <div className="bg-sidebar border border-border rounded-xl p-5 flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
        {label}
      </span>
      <div className="flex items-end gap-3">
        <span className="text-2xl font-bold text-text-base">{value}</span>
        {badge && (
          <span
            className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full mb-1",
              badgeColors[badgeVariant],
            )}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};
