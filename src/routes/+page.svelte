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
    
    <div class="flex flex-col gap-5 justify-center">
        <h1 class="font-sans font-bold text-gray-800 text-[8rem] uppercase text-center leading-none h-12">Find Your Fortune</h1>
        <h1 class="font-sans text-white text-[6rem] text-center leading-none z-10">
            Text <span class="font-bold text-transparent bg-gradient-to-br from-brand-orange to-brand-red bg-clip-text">{import.meta.env.VITE_PHONE_NUMBER}</span>
        </h1>
    </div>

    <div class="bg-gray-900 w-2/3 mx-auto my-10 p-5 rounded-lg border-gray-800 border-2 text-3xl text-white scale-110">
        {#if fortunes.length}
            <p>
                <span class="blur-[8px]">({Math.random().toString().slice(2,5)})</span>
                <span class="blur-[8px]">{Math.random().toString().slice(2,5)}</span><nobr>
                -{fortunes[0][0]}: {fortunes[0][1]}
            </p>
        {:else}
            <p class="mx-auto">Waiting on a text...</p>
        {/if}
    </div>
    {#each fortunes.slice(1) as fortune, i}
        <div class="bg-gray-900 w-2/3 mx-auto my-5 p-5 rounded-lg border-gray-800
                    border-2 text-3xl scale-[90%] text-white fortune-card" style="--index: {i}" >
            <span class="blur-[8px]">({Math.random().toString().slice(2,5)})</span>
            <span class="blur-[8px]">{Math.random().toString().slice(2,5)}</span><nobr>
            -{fortune[0]}: {fortune[1]}
        </div>
    {/each}

    {JSON.stringify(fortunes)}

    <!-- <img src="hands-on-ball1.png" alt="" class="absolute h-[80%] -bottom-[20%] left-1/2 -translate-x-1/2"> -->
    <!-- <div class="scale-75 translate-y-20"> -->
        <div class="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/4 w-[90vh] h-[90vh] scale-50">
            <CrystalBall />
        </div>
    <!-- </div> -->
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
        opacity: calc(1 - (var(--index) + 1) / 5);
    }
</style>