import type { LLMAdapter, LLMMessage } from "./types";

/**
 * OpenAI adapter stub.
 * Install `openai` package to use: npm install openai
 */
export class OpenAIAdapter implements LLMAdapter {
  name = "openai";

  constructor(_apiKey: string, private model = "gpt-4o") {}

  async chat(
    messages: LLMMessage[],
    options?: { maxTokens?: number; temperature?: number }
  ): Promise<string> {
    // Dynamic import to avoid requiring openai package unless actually used
    let OpenAI: any;
    try {
      OpenAI = (await import("openai" as string)).default;
    } catch {
      throw new Error(
        "OpenAI package not installed. Run: npm install openai"
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.chat.completions.create({
      model: this.model,
      max_tokens: options?.maxTokens || 8192,
      temperature: options?.temperature ?? 0.7,
      messages: messages.map((m: LLMMessage) => ({ role: m.role, content: m.content })),
    });

    return response.choices[0]?.message?.content || "";
  }
}
