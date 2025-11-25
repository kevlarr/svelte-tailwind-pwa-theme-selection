import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const themeCookie = event.cookies.get('theme');

  if (themeCookie && !['light', 'dark'].includes(themeCookie)) {
    event.cookies.delete('theme', { path: '/' });
  }

  return resolve(event);
};
