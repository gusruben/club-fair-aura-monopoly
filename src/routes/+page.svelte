<script lang="ts">
	import { onMount } from "svelte";
	import CrystalBall from "./../lib/CrystalBall.svelte";

	// the current list of fortunes is prefetched in +page.server.ts
	let { data } = $props();
	let fortunes = $state(data.fortunes);

	onMount(async () => {
		setInterval(async () => {
			fortunes = await (await fetch("/api/fortunes")).json();
		}, 5000);
	});
</script>

<div class="fixed inset-0 overflow-hidden bg-gray-950">
	<div
		class="fixed -bottom-[50vh] -left-[10vw] -right-[10vw] -top-[50vh] -z-50 origin-[50%_64%] animate-spin-slow opacity-20"
	>
		{#each Array(100) as _}
			<div
				class="star"
				style={`--x: ${Math.random() * 100}%; --y: ${Math.random() * 100}%; --size: ${8 + Math.random() * 10}px; --rot: ${Math.random() * 360}deg`}
			></div>
		{/each}
	</div>

	<div class="mb-10 flex flex-col justify-center gap-5">
		<h1
			class="h-12 text-center font-sans text-[8rem] font-bold uppercase leading-none text-gray-700 opacity-40"
		>
			Find Your Fortune
		</h1>
		<h1 class="z-10 text-center font-sans text-[6rem] leading-none text-white">
			Text Your Name: <span
				class="bg-gradient-to-br from-brand-orange to-brand-red bg-clip-text font-bold text-transparent"
				>{import.meta.env.VITE_PHONE_NUMBER}</span
			>
		</h1>
	</div>

	{#if fortunes.length}
		{#each fortunes as fortune, i}
			<div
				class="fortune-card mx-auto my-5 flex w-2/3 flex-row rounded-lg
                        border-2 border-gray-800 bg-gray-900 p-5 text-3xl text-white"
				style="--index: {i + 1}"
			>
				{#if fortune.numberName}
					<nobr class="font-bold">
						<span class="blur-[8px]">({Math.random().toString().slice(2, 5)})</span>
						<span class="blur-[8px]">{Math.random().toString().slice(2, 5)}</span>
						<!-- <span class="relative after:absolute after:w-full after:h-[60%] after:bg-gradient-to-br after:from-brand-orange
                                    after:to-brand-red after:inset-0 after:-rotate-6 after:translate-y-[30%] after:brightness-50 after:saturate-50">
                            ({Math.random().toString().slice(2,5)}) {Math.random().toString().slice(2,5)}
                        </span><nobr> -->
						-{fortune.name}:
					</nobr>
				{:else}
					<p class="font-bold capitalize">{fortune.name}:</p>
				{/if}
				<p class="ml-2">{fortune.fortune}</p>
			</div>
		{/each}
	{:else}
		<div
			class="mx-auto my-10 w-2/3 rounded-lg border-2 border-gray-800 bg-gray-900 p-5 text-3xl text-white"
		>
			Waiting on a text...
		</div>
	{/if}

	<!-- <img src="hands-on-ball1.png" alt="" class="absolute h-[80%] -bottom-[20%] left-1/2 -translate-x-1/2"> -->
	<div
		class="absolute bottom-0 left-1/2 h-[90vh] w-[90vh] -translate-x-1/2 translate-y-1/4 scale-50"
	>
		<CrystalBall />
	</div>
</div>

<style>
	.star {
		position: absolute;
		z-index: -50;
		left: var(--x);
		top: var(--y);
		width: var(--size);
		height: var(--size);
		transform: rotate(var(--rot));
		background-color: white;
		/* border-radius: var(--size); */
		--half: calc(var(--size) / 2);
		mask: radial-gradient(var(--half) at var(--half) var(--half), transparent 98%, red)
			calc(-1 * var(--half)) calc(-1 * var(--half));
	}

	.fortune-card {
		opacity: calc(1 - (var(--index) - 1) / 8);
		scale: calc(70% + (50% / var(--index)));
		/* margin-bottom: calc(2rem - (var(--index) * var(--index) * 0.2rem)) */
		margin-bottom: calc(1rem + (1rem / (var(--index) * var(--index))));
	}
</style>
