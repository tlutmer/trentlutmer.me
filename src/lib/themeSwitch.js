// Applies a colour theme to <html>. If something has registered a runner (ThemeTransition does),
// the runner decides when the change is applied — so a transition can cover the page first —
// otherwise it is applied immediately.
let runner = null

export function setThemeRunner(fn) {
  runner = fn
}

export function switchTheme(id) {
  const apply = () => document.documentElement.setAttribute('data-color-theme', id)
  if (runner) runner(apply)
  else apply()
}
