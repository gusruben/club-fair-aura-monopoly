<script lang="ts">
	import { onMount } from 'svelte';
	import CrystalBall from './../lib/CrystalBall.svelte';

    // the current list of fortunes is prefetched in +page.server.ts 
    let { data } = $props();
    let fortunes = $state(data.fortunes);

    onMount(async () => {
        setInterval(async () => {
            fortunes = await (await fetch("/api/fortunes")).json();
        }, 5000)
    })

</script>

<div class="fixed inset-0 bg-gray-950 overflow-hidden">
    <div class="fixed inset-0 -z-50 opacity-20">
        {#each Array(100) as _}
            <div class="star" style={`--x: ${Math.random() * 100}%; --y: ${Math.random() * 100}%; --size: ${8 + Math.random() * 10}px`}></div>
        {/each}
    </div>
    
    <div class="flex flex-col gap-5 justify-center mb-10">
        <h1 class="font-sans font-bold text-gray-800 text-[8rem] uppercase text-center leading-none h-12">Find Your Fortune</h1>
        <h1 class="font-sans text-white text-[6rem] text-center leading-none z-10">
            Text <span class="font-bold text-transparent bg-gradient-to-br from-brand-orange to-brand-red bg-clip-text">{import.meta.env.VITE_PHONE_NUMBER}</span>
        </h1>
    </div>

    {#if fortunes.length}
        {#each fortunes as fortune, i}
            <div class="bg-gray-900 w-2/3 mx-auto my-5 p-5 rounded-lg border-gray-800
                        border-2 text-3xl text-white fortune-card" style="--index: {i + 1}" >
                <span class="blur-[8px]">({Math.random().toString().slice(2,5)})</span>
                <span class="blur-[8px]">{Math.random().toString().slice(2,5)}</span><nobr>
                <!-- <span class="relative after:absolute after:w-full after:h-[60%] after:bg-gradient-to-br after:from-brand-orange
                            after:to-brand-red after:inset-0 after:-rotate-6 after:translate-y-[30%] after:brightness-50 after:saturate-50">
                    ({Math.random().toString().slice(2,5)}) {Math.random().toString().slice(2,5)}
                </span><nobr> -->
                -{fortune[0]}: {fortune[1]}
            </div>
        {/each}
    {:else}
        <div class="bg-gray-900 w-2/3 mx-auto my-10 p-5 rounded-lg border-gray-800 border-2 text-3xl text-white">
            Waiting on a text...
        </div>
    {/if}


    <!-- <img src="hands-on-ball1.png" alt="" class="absolute h-[80%] -bottom-[20%] left-1/2 -translate-x-1/2"> -->
        <div class="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/4 w-[90vh] h-[90vh] scale-50">
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
        background-color: white;
        /* border-radius: var(--size); */
        --half: calc(var(--size)/2);
        mask: radial-gradient(var(--half) at var(--half) var(--half), transparent 98%, red) calc(-1*var(--half)) calc(-1*var(--half));
    }

    .fortune-card {
        opacity: calc(1 - (var(--index) - 1) / 8);
        scale: calc(70% + (50% / var(--index)));
        /* margin-bottom: calc(2rem - (var(--index) * var(--index) * 0.2rem)) */
        margin-bottom: calc(1rem + (1rem / (var(--index) * var(--index))))
    }
</style>