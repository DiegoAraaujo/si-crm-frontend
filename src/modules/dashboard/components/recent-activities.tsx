import { Activity } from "lucide-react";
import type { RecentActivity } from "../api";

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

export const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  return (
    <div className="bg-sidebar border border-border rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-text-base">Atividades Recentes</h2>
      </div>

      <div className="flex flex-col gap-4">
        {activities.length === 0 && (
          <p className="text-sm text-text-muted">Nenhuma atividade recente.</p>
        )}
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm text-text-base">
                {activity.action}{" "}
                <span className="font-semibold">{activity.leadName}</span>
              </p>
              <p className="text-xs text-text-muted">
                {new Date(activity.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
