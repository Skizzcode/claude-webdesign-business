import type { LLMAdapter } from "./types";
import { AnthropicAdapter } from "./anthropic";
import { OpenAIAdapter } from "./openai";

export type { LLMAdapter, LLMMessage } from "./types";

export function createLLMAdapter(): LLMAdapter {
  const provider = process.env.LLM_PROVIDER || "anthropic";

  if (provider === "anthropic") {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) throw new Error("ANTHROPIC_API_KEY is required when LLM_PROVIDER=anthropic");
    return new AnthropicAdapter(key, process.env.LLM_MODEL);
  }

  if (provider === "openai") {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY is required when LLM_PROVIDER=openai");
    return new OpenAIAdapter(key, process.env.LLM_MODEL);
  }

  throw new Error(`Unknown LLM_PROVIDER: ${provider}. Use "anthropic" or "openai".`);
}
