import { fortunes } from "$lib/shared.svelte.js";
import { json } from "@sveltejs/kit";

export async function GET() {
	return json(fortunes);
}
