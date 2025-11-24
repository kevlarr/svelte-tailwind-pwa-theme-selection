<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$src/app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main class="bg-white dark:bg-black flex-grow text-black dark:text-white">
	{@render children()}
</main>
