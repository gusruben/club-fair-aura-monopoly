import Anthropic from "@anthropic-ai/sdk";
import type { TextBlock } from "@anthropic-ai/sdk/resources/messages.mjs";
import OpenAI from "openai";

const FORTUNE_PROMPT =
	"Generate a single short, random fortune, like a fortune cookie. Make it strangely ominous and specific, while not too cryptic or esoteric.";
const NAME_SAFE_PROMPT =
	"Check if this user-submitted name is safe and inoffensive. Do not reject fake names, just names that are offensive in some way. Respond ONLY with `yes` or `no`, never respond with anything else than either of those two words.";

let anthropicClient: Anthropic;
let openAIClient: OpenAI;

if (import.meta.env.VITE_ANTHROPIC_API_KEY) {
	anthropicClient = new Anthropic({
		apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
	});
} else if (import.meta.env.VITE_OPENAI_API_KEY) {
	openAIClient = new OpenAI({
		apiKey: import.meta.env.VITE_OPENAI_API_KEY,
	});
} else {
	throw new Error("Missing Anthropic or OpenAI API Key");
}

async function promptAI(prompt: string, maxTokens = 64) {
	let output: string;
	if (import.meta.env.VITE_ANTHROPIC_API_KEY) {
		const response = await anthropicClient.messages.create({
			max_tokens: maxTokens,
			messages: [{ role: "user", content: prompt }],
			model: "claude-3-5-sonnet-latest",
		});
		output = (response.content[0] as TextBlock).text;
	} else {
		const chatCompletion = await openAIClient.chat.completions.create({
			messages: [{ role: "user", content: prompt }],
			model: "gpt-3.5-turbo",
		});
		output = chatCompletion.choices[0].message.content as string;
	}

	return output;
}

export async function generateFortune() {
	const fortune = await promptAI(FORTUNE_PROMPT);
	return fortune.replace(/^["']|["']$/g, ""); // strip quotes
}

export async function isNameSafe(name: string) {
	const response = await promptAI(NAME_SAFE_PROMPT + "\n\n" + name);
	console.log(name, response);
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
