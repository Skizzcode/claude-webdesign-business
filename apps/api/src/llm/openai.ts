import type { LLMAdapter, LLMMessage } from "./types";

/**
 * OpenAI adapter stub.
 * Implement when needed — follows the same LLMAdapter interface.
 */
export class OpenAIAdapter implements LLMAdapter {
  name = "openai";

  constructor(_apiKey: string, private model = "gpt-4o") {}

  async chat(
    messages: LLMMessage[],
    options?: { maxTokens?: number; temperature?: number }
  ): Promise<string> {
    // Dynamic import to avoid requiring openai package unless actually used
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.chat.completions.create({
      model: this.model,
      max_tokens: options?.maxTokens || 8192,
      temperature: options?.temperature ?? 0.7,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    return response.choices[0]?.message?.content || "";
  }
}
