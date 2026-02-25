export interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMAdapter {
  name: string;
  chat(messages: LLMMessage[], options?: { maxTokens?: number; temperature?: number }): Promise<string>;
}
