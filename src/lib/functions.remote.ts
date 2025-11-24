import { redirect } from '@sveltejs/kit';
import * as v from 'valibot';
import { getRequestEvent, form, query } from '$app/server';

export const getTheme = query(async () => {
  const { cookies } = getRequestEvent();
  return cookies.get('theme');
});

export const setTheme = form(
  v.object({
    theme: v.optional(v.picklist(['light', 'dark', 'system'])),
  }),
  async ({ theme }) => {
    const { cookies, request, url } = getRequestEvent();

    // The `event.url` corresponds to the remote functions's specific URL.
    // which is basically the pathname of the page it is called from along
    // with a query param specifying the function. To redirect back to
    // the appropriate page (and maintain query parameters), we need to use
    // the `referer` header set by Svelte as it calls the remote function.
    //
    // For example, if we are on the following page...
    //
    //   http://localhost:5173/child?wat=now
    //
    // ... then the above URL will be the referrer set in the headers, and
    // the `event.url` will be...
    //
    //   http://localhost:5173/child?/remote=1gykboy/setTheme
    //
    const referrer = request.headers.get('referer') ?? '/';

    if (theme === undefined || theme === 'system') {
      cookies.delete('theme', { path: '/' });
    } else {
      cookies.set('theme', theme, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
    }

    await getTheme().refresh();

    redirect(303, referrer);
  },
);
