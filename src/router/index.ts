import { $APP, ROUTES } from '@utils/constants.ts'

export async function router(app: HTMLElement) {
  const route = ROUTES[window.location.pathname as keyof typeof ROUTES] as
    | (typeof ROUTES)[keyof typeof ROUTES]
    | undefined

  if (route == null) {
    history.pushState('', '', '/')
    await router(app)
    return
  }

  document.title = route.title
  app.innerHTML = await route.view()
}

// Handle navigation
window.addEventListener('click', async (e) => {
  const target = e.target as HTMLAnchorElement
  if (target.matches('[data-link]')) {
    e.preventDefault()
    history.pushState('', '', target.href)
    await router($APP)
  }
})

// Update router on back/forward navigation
window.addEventListener('popstate', async () => {
  await router($APP)
})
window.addEventListener('DOMContentLoaded', async () => {
  await router($APP)
})
