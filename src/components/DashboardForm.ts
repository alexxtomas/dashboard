class DashaboardForm extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  // Observe the following attributes in order to trigger attributeChangedCallback
  static get observedAttributes() {
    return ['is-authenticated']
  }

  static get styles() {
    return /* css */ `
    div {
      display: flex;
      align-items: center;
      gap: 10px;
    }
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        border: 1px solid #ccc;
        padding: 0px 16px;
        height: 32px;
        background-color: #fff;
        font-size: 14px;
      }
      [name="title"] {
        color: blue;
        font-size: 32px;
        display: block;
      }
    `
  }

  changeAuthor(author: string) {
    if (this.shadowRoot == null) throw new Error('Shadow root not found')
    const h1 = this.shadowRoot.querySelector('h1') as HTMLHeadingElement
    h1.textContent = author
  }

  // Invoked each time the observedAttributes changes.
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`)
  }

  // Invoked when the custom element is moved to a new document.
  adoptedCallback() {
    console.log('adopted')
  }

  test() {
    console.log('test')
  }

  sendMessage() {
    alert('Has hecho click')
    this.test()
  }

  handleEvent(e: Event) {
    console.log(e.type)
    if (e.type === 'click') {
      this.sendMessage()
    }
  }

  // Invoked when the custom element is inserted on HTML document.
  connectedCallback() {
    console.log('connected')
    if (this.shadowRoot == null) throw new Error('Shadow root not found')
    this.shadowRoot.innerHTML = /* html */ `
    <style>${DashaboardForm.styles}</style>
    <div>
      <slot name="title"></slot>
      <button>Press me</button>
    </div>
    `
    this.button = this.shadowRoot.querySelector('button')
    this.button.addEventListener('click', this)
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this)
  }

  // render() {
  //   if (this.shadowRoot == null) throw new Error('Shadow root not found')
  //   this.shadowRoot.innerHTML = /* html */ `
  //    <style>${DashaboardForm.styles}</style>
  //     <form id="dashboard-form">
  //        <h1>pepe</h1>
  //     </form>
  //   `
  // }
}

customElements.define('dashboard-form', DashaboardForm)
