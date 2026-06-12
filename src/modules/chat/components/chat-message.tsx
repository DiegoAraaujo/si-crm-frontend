import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";
import type { Message } from "../api";

interface ChatMessageProps {
  message: Message;
  userName?: string;
}

export const ChatMessage = ({ message, userName }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      <div
        className={cn("flex flex-col gap-1 max-w-[75%]", isUser && "items-end")}
      >
        {!isUser && (
          <span className="text-xs font-semibold text-text-muted">IA Chat</span>
        )}
        {isUser && userName && (
          <span className="text-xs font-semibold text-primary">{userName}</span>
        )}

        <div
          className={cn(
            "px-4 py-3 rounded-2xl text-sm leading-relaxed",
            isUser
              ? "bg-primary text-white rounded-tr-sm"
              : "bg-white border border-border text-text-base rounded-tl-sm",
          )}
        >
          {message.content}
        </div>

        <span className="text-xs text-text-muted">
          {message.createdAt.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
