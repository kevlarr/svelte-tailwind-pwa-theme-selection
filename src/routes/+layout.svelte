<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import AppContainer from '$src/app.svelte';
	import Footer from '$src/footer.svelte';
	import '$src/app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<AppContainer>
	<header class="bg-neutral-200 dark:bg-neutral-700 flex items-center p-4 justify-between text-black dark:text-white">
		<h1 class="text-2xl">theme switching test</h1>
		<nav class="flex gap-4">
			<a href="/">home</a>
			<a href="/child?with=params">child</a>
			<a href="/settings">settings</a>
		</nav>
	</header>

	<main class="bg-white dark:bg-black flex-grow text-black dark:text-white p-8">
		{@render children()}
	</main>

	<!-- Put the footer in its own component so that it can access the AppContainer's context -->
	<Footer />
</AppContainer>
