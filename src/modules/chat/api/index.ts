import api from "@/lib/axios";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

export const sendMessage = async (
  message: string,
  history: Message[],
): Promise<string> => {
  const { data } = await api.post("/ai/chat", {
    message,
    history: history.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  });
  return data.response;
};
