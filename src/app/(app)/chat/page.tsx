"use client";

import { useEffect, useRef } from "react";
import { useChat } from "@/modules/chat/hooks";
import { ChatMessage } from "@/modules/chat/components/chat-message";
import { ChatInput } from "@/modules/chat/components/chat-input";
import { useAuthStore } from "@/store/auth.store";

const ChatPage = () => {
  const { messages, isLoading, send } = useChat();
  const user = useAuthStore((s) => s.user);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const today = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] lg:h-[calc(100vh-3rem)] bg-white rounded-2xl border border-border overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <div className="flex items-center justify-center">
          <span className="text-xs text-text-muted bg-bg border border-border px-3 py-1 rounded-full">
            Hoje, {today}
          </span>
        </div>

        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            userName={user?.name}
          />
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-5">
                <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0ms]" />
                <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:150ms]" />
                <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={send} disabled={isLoading} />
    </div>
  );
};

export default ChatPage;
