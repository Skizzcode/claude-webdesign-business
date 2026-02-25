import Anthropic from "@anthropic-ai/sdk";
import type { LLMAdapter, LLMMessage } from "./types";

export class AnthropicAdapter implements LLMAdapter {
  name = "anthropic";
  private client: Anthropic;
  private model: string;

  constructor(apiKey: string, model?: string) {
    this.client = new Anthropic({ apiKey });
    this.model = model || "claude-sonnet-4-20250514";
  }

  async chat(
    messages: LLMMessage[],
    options?: { maxTokens?: number; temperature?: number }
  ): Promise<string> {
    // Separate system message from conversation
    const systemMsg = messages.find((m) => m.role === "system");
    const conversationMsgs = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: options?.maxTokens || 8192,
      temperature: options?.temperature ?? 0.7,
      system: systemMsg?.content || "",
      messages: conversationMsgs,
    });

    const textBlock = response.content.find((b) => b.type === "text");
    return textBlock?.text || "";
  }
}
