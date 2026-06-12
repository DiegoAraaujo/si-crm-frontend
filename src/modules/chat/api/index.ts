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
  const response = await fetch(`${process.env.NEXT_PUBLIC_AI_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      history: history.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!response.ok) throw new Error("Erro ao enviar mensagem");

  const data = await response.json();
  return data.response;
};
