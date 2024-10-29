import Anthropic from "@anthropic-ai/sdk";
import type { TextBlock } from "@anthropic-ai/sdk/resources/messages.mjs";

const FORTUNE_PROMPT = "Generate a single short, random fortune, like a fortune cookie. Make it strangely ominous and specific, while not too cryptic or esoteric."
const NAME_SAFE_PROMPT = "Check if this user-submitted name is safe and inoffensive. Do not reject fake names, just names that are offensive in some way. Respond ONLY with `yes` or `no`, never respond with anything else than either of those two words."

const client = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
});

async function promptClaude(prompt: string, maxTokens = 64) {
    const response = await client.messages.create({
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
        model: "claude-3-5-sonnet-latest",
    });

    return (response.content[0] as TextBlock).text;
}

export async function generateFortune() {
    const fortune = await promptClaude(FORTUNE_PROMPT);
    return fortune.replace(/^["']|["']$/g, ""); // strip quotes
}

export async function isNameSafe(name: string) {
    const response = await promptClaude(NAME_SAFE_PROMPT + "\n\n" + name);
    console.log(name, response)
    switch (response.toLowerCase()) {
        case "yes":
            return true;
        case "no":
            return false;
        default:
            console.error(`Unexpected response from Claude: ${response}`);
            return false;
    }
}