import Anthropic from "@anthropic-ai/sdk";
import type { TextBlock } from "@anthropic-ai/sdk/resources/messages.mjs";

const PROMPT = "Generate a single short, random fortune, like a fortune cookie. Make it strangely ominous and specific, while not too cryptic or esoteric."

const client = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
});

export async function generateFortune() {
    const fortune = await client.messages.create({
        max_tokens: 64,
        messages: [{ role: "user", content: PROMPT }],
        model: "claude-3-5-sonnet-latest",
    });
    const fortuneText = (fortune.content[0] as TextBlock).text;

    return fortuneText.replace(/^["']|["']$/g, ""); // strip quotes
}