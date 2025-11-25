<script lang="ts" module>
  import { createContext } from 'svelte';

  interface AppState {
    theme: string;
  }

  interface AppContext {
    state: AppState;
    // TODO: arg type
    themeFormEnhance: () => void;
  }

  const [getAppContext, setAppContext] = createContext<AppContext>();
  export { getAppContext };
</script>

<script lang="ts">
  import { getTheme } from '$lib/functions.remote';

	let { children } = $props();

	// TODO: What is the appropriate type?
	const themeFormEnhance: any = async ({ data, submit }: any) => {
		await submit();
		appState.theme = data.theme;
	};

  // This MUST happen before any `await` in the component initialization
  let appState = $state({ theme: 'system' });

  setAppContext({
    state: appState,
    themeFormEnhance,
  });

  appState.theme = (await getTheme()) ?? 'system';
</script>

<div class={["contents", {
  'theme-dark': appState.theme === 'dark',
  'theme-light': appState.theme === 'light',
}]}>
  {@render children()}
</div>
