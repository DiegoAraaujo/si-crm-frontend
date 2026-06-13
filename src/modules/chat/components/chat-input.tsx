"use client";

import { useState } from "react";
import { Send, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border p-4 bg-white">
      <div className="flex items-center gap-3 border border-border rounded-2xl px-4 py-3 bg-bg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pergunte qualquer coisa sobre seus leads..."
          disabled={disabled}
          className="flex-1 bg-transparent text-sm text-text-base placeholder:text-text-muted outline-none disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="w-9 h-9 bg-primary hover:bg-primary-dark disabled:opacity-40 rounded-xl flex items-center justify-center transition flex-shrink-0"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
      <p className="text-xs text-text-muted text-center mt-2">
        SI CRM IA pode cometer erros. Verifique informações importantes no
        Dashboard.
      </p>
    </div>
  );
};
