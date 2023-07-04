class DashboardLayout extends HTMLElement {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super()
  }

  static get styles() {
    return /* css */ `
      main {
        display: flex;
        height: 100vh;
        width: 100vw;
        aligh-items: center;
        justify-content: center;
      }
    `
  }

  connectedCallback() {
    this.innerHTML = /* html */ `
      <main>
        <slot></slot>
      </main>
    `
  }
}

customElements.define('dashboard-layout', DashboardLayout)
