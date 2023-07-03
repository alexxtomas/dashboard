class DashaboardForm extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  static get styles() {
    return /* css */ `
      form {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #fff;
      }
      form > * {
        color: red;
        font-size: 40px;
      }
    `
  }

  changeAuthor(author: string) {
    if (this.shadowRoot == null) throw new Error('Shadow root not found')
    const h1 = this.shadowRoot.querySelector('h1') as HTMLHeadingElement
    h1.textContent = author
  }

  render() {
    if (this.shadowRoot == null) throw new Error('Shadow root not found')
    this.shadowRoot.innerHTML = /* html */ `
     <style>${DashaboardForm.styles}</style>
      <form id="dashboard-form">
         <h1>pepe</h1>
      </form>
    `
  }
}

customElements.define('dashboard-form', DashaboardForm)

const form = document.querySelector('dashboard-form') as DashaboardForm
form.changeAuthor('Pepe')
