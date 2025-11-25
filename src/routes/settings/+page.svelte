<script lang="ts">
  import { getAppContext } from '$src/app.svelte';
  import { setTheme } from '$lib/functions.remote';

  const settingsThemeFormId = $props.id();
  const appContext = getAppContext();

	setTheme.fields.set({ theme: appContext.state.theme as any });

  $effect(() => {
    // Rerun in an effect so that updating theme in footer's menu
    // propagates to this page as well
	  setTheme.fields.set({ theme: appContext.state.theme as any });
  });
</script>

<div class="flex flex-col gap-4">
  <h1 class="text-3xl">Settings</h1>
  <section class="flex flex-col gap-4">
    <h2 class="text-2xl">Appearance</h2>
    <form
      class="flex flex-col self-start gap-4 my-4"
      {...setTheme.for(settingsThemeFormId).enhance(appContext.themeFormEnhance)}
    >
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
      <button class="border cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-600 px-4 py-2" type="submit">submit</button>
    </form>
  </section>
</div>
