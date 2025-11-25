<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
  import { getTheme, setTheme } from '$lib/functions.remote';
	import '$src/app.css';

	let { children } = $props();
	const footerThemeFormId = $props.id();
  const initialTheme = (await getTheme()) ?? 'system';

  let theme = $state(initialTheme);
	let wrapperCls = $derived(
		theme === 'system'
			? ''
			: theme === 'dark'
				? 'theme-dark'
				: 'theme-light'
	);

	setTheme.fields.set({ theme: initialTheme as any });

	// TODO: What is the appropriate type?
	const enhanceFn = async ({ data, form, submit }: any) => {
		await submit(); // To reset form after submit, calll `form.reset()`
		theme = data.theme;
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class={/* TODO: Why wasn't this working with object form here and conditional checks? */ wrapperCls}
	style:display='contents'
>
	<header
		class="bg-neutral-200 dark:bg-neutral-700 flex items-center p-4 justify-between text-black dark:text-white"
	>
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

	<footer class="bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white">
		<div class="text-center">
			<form class="flex gap-4 justify-center my-4" {...setTheme.for(footerThemeFormId).enhance(enhanceFn)}>
				<select class="border p-2" {...setTheme.fields.theme.as('select')}>
					<option>light</option>
					<option>dark</option>
					<option>system</option>
				</select>
				{#each setTheme.fields.theme.issues() as issue (issue.message)}
					<p class="text-red-500">{issue.message}</p>
				{/each}
				<button class="cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-600 px-4 py-2" type="submit">submit</button>
			</form>
		</div>
	</footer>
</div>
