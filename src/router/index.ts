import { $APP, ROUTES } from '@utils/constants.ts'

export function router(app: HTMLElement) {
  const route = ROUTES[window.location.pathname as keyof typeof ROUTES] as
    | (typeof ROUTES)[keyof typeof ROUTES]
    | undefined

  if (route == null) {
    history.pushState('', '', '/')
    router(app)
    return
  }

  document.title = route.title
  app.innerHTML = route.view()
}

window.addEventListener('click', (e) => {
  const target = e.target as HTMLAnchorElement
  if (target.matches('[data-link]')) {
    e.preventDefault()
    history.pushState('', '', target.href)
    router($APP)
  }
})

window.addEventListener('popstate', () => {
  router($APP)
})
window.addEventListener('DOMContentLoaded', () => {
  router($APP)
})
