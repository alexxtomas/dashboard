export function $<T>(selector: string) {
  return document.querySelector(selector) as T
}

export function $$(selector: string) {
  return document.querySelectorAll(selector)
}
