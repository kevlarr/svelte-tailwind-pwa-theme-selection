# PWA-friendly Svelte/Tailwind theme selection

This repo is a demonstration of how to support theme selection in
JavaScript-disabled environments, allowing the user to select light,
dark, or system-preferred theme.

This utilizes a(n experimental) *remote form* (instead of form action)
that sets a cookie, with which the server is able to appropriately assign
a class to force light or dark mode if not wanting to follow system preference.

No event listeners are manually added and no media queries are performed manually;
almost all of the magic happens with a multi-rule custom dark variant for Tailwind:

```css
@custom-variant dark {
  @media (prefers-color-scheme: dark) {
    &:not(:is(.theme-light, .theme-light *)) {
      @slot;
    }
  }

  &:is(.theme-dark, .theme-dark *) {
    @slot;
  }
}
```

The server can assign the `.theme-light` or `.theme-dark` class during initial render,
natively supporting JS-disabled clients, and the only extra bit necessary to get it
working in JS-enabled clients is a single `$state` that is updated through
the enhanced form after submit.
