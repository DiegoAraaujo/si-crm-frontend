import { cn } from "@/lib/utils";

interface LeadAvatarProps {
  name: string;
  size?: "sm" | "md";
}

const colors = [
  "bg-primary",
  "bg-warm",
  "bg-hot",
  "bg-purple-500",
  "bg-orange-500",
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const getColor = (name: string) => colors[name.charCodeAt(0) % colors.length];

export const LeadAvatar = ({ name, size = "md" }: LeadAvatarProps) => {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center text-white font-bold flex-shrink-0",
        getColor(name),
        size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm",
      )}
    >
      {getInitials(name)}
    </div>
  );
};
