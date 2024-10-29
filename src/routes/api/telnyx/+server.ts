import { json } from "@sveltejs/kit";
import { fortunes } from "$lib/shared.svelte.js";
import { generateFortune } from "$lib/ai";

export async function POST({ request }) {
    const payload = await request.json();

    if (payload.data.event_type === 'message.received') {
        const from = payload.data.payload.from.phone_number;
        console.log("Message received from", from);

        // use the set operator to make everything update right
        fortunes.unshift([from.slice(-4), await generateFortune()]);
        console.log(fortunes[0][1])
        console.log(fortunes);
    
        return json({ success: true });
    }
    
    return json({ success: false });
}