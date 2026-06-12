import { Phone, Mail, Settings } from "lucide-react";
import type { RecentActivity } from "../api";

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

const icons = {
  call: Phone,
  email: Mail,
  system: Settings,
};

export const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  return (
    <div className="bg-sidebar border border-border rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-text-base">Atividades Recentes</h2>
        <span className="text-xs text-primary font-medium cursor-pointer hover:underline">
          Log
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {activities.map((activity) => {
          const Icon = icons[activity.type] ?? Settings;
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm text-text-base">{activity.description}</p>
                <p className="text-xs text-text-muted uppercase tracking-wide">
                  {activity.time} • {activity.agent}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
