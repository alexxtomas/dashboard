class InputField extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const id = this.getAttribute('id') ?? 'input'

    shadow.innerHTML = this.getTemplate(id)
  }

  getTemplate(id: string) {
    return `
      <label for=${id}>
        <input id=${id} type="text" />
        <slot name="validation-error"></slot>
      </label>
    `
  }
}

customElements.define('dashboard-input-field', InputField)
