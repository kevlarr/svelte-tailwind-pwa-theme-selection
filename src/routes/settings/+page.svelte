<script lang="ts">
  import { getTheme, setTheme } from '$lib/functions.remote';

  const settingsThemeFormId = $props.id();

	setTheme.fields.set({ theme: (await getTheme()) ?? 'system' as any });
</script>

<div class="flex flex-col gap-4">
  <h1 class="text-3xl">Settings</h1>
  <section class="flex flex-col gap-4">
    <h2 class="text-2xl">Appearance</h2>
    <form class="flex flex-col self-start gap-4 my-4" {...setTheme.for(settingsThemeFormId)}>
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
  </section>
</div>
