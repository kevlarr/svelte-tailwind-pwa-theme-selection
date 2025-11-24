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

    // `event.url` corresponds to the remote function's URL, which is
    // basically a weird query param appened to the referrer, so we
    // want the original URL
    //
    // The `event.url` corresponds to the remote functions's specific URL.
    // which is basically the pathname of the page it is called from along
    // with a query param specifying the function.
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
    // To avoid the URL changing and losing other query params, this means
    // that we want to redirect back to the referrer URL,
    const referrer = request.headers.get('referer') ?? '/';

    console.log('remote function URL: ', url);
    console.log('referrer URL: ', referrer);

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
