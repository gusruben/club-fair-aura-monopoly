<script lang="ts">
	import "../app.css";
	let { children } = $props();
</script>

<svelte:head>
    <title>Club Fair Aura Monopoly</title> 
</svelte:head>


{@render children()}
