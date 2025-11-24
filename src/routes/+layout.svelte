<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
  import { getTheme, setTheme } from '$lib/functions.remote';
	import '$src/app.css';

	let { children } = $props();

  const theme = (await getTheme()) ?? 'system';
	setTheme.fields.set({ theme: theme as any });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class={{
	'theme-dark': theme === 'dark',
	'theme-light': theme === 'light',
	}}
	style:display='contents'
>
	<header
		class="bg-neutral-200 dark:bg-neutral-700 flex items-center p-4 justify-between text-black dark:text-white"
	>
		<h1 class="text-2xl">theme switching test</h1>
		<nav class="flex gap-4">
			<a href="/">home</a>
			<a href="/child?with=params">child</a>
		</nav>
	</header>

	<main class="bg-white dark:bg-black flex-grow text-black dark:text-white p-8">
		{@render children()}
	</main>

	<footer class="bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white">
		<div class="text-center">
			<form class="my-4" {...setTheme}>
				<label>
					Theme
					<select class="border p-2" {...setTheme.fields.theme.as('select')}>
						<option>light</option>
						<option>dark</option>
						<option>system</option>
					</select>
				</label>
				{#each setTheme.fields.theme.issues() as issue (issue.message)}
					<p class="text-red-500">{issue.message}</p>
				{/each}
				<button type="submit">submit</button>
			</form>
		</div>
	</footer>
</div>
