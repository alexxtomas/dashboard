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
    const h1 = this.shadowRoot!.querySelector('h1')
    h1!.textContent = author
  }
  render() {
    this.shadowRoot!.innerHTML = /* html */ `
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
