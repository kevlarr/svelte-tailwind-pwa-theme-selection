<script lang="ts">
  import { browser } from '$app/environment';
	import { getAppContext } from '$src/app.svelte';
  import { getTheme, setTheme } from '$lib/functions.remote';

	const appContext = getAppContext();
	const footerThemeFormId = $props.id();
  const initialTheme = (await getTheme()) ?? 'system';
  let formRef: HTMLFormElement;

	setTheme.fields.set({ theme: initialTheme as any });

  await new Promise((resolve) => setTimeout(resolve, 500));
</script>

<footer class="bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white">
  <div class="text-center">
    <form
      bind:this={formRef}
      class="flex gap-4 justify-center my-4"
      oninput={() => formRef.requestSubmit()}
      {...setTheme.for(footerThemeFormId).enhance(appContext.themeFormEnhance)}
    >
      <select
        class="border p-2 noscript:hidden"
        disabled={
          /* disable as a backup for older browsers where scripting media query is unsupported */
          !browser
        }
        {...setTheme.fields.theme.as('select')}
      >
        <option>light</option>
        <option>dark</option>
        <option>system</option>
      </select>
    </form>
  </div>
</footer>

<style>
  select[disabled] {
    color: #777;
    cursor: not-allowed;
  }
</style>
