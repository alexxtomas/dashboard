import { SHARED_ERROR_MESSAGE } from '@components/shared/helper.ts'

class ButtonElement extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get styles() {
    return /* css */ `
    button {
      border: none;
      border-radius: 8px;
      font-family: 'SF UI Text Medium';
      font-size: 16px;
      letter-spacing: 0.25px;
      color: #2b2f30;
      padding: 16px 40px;
      background-color: #c4eafd;
      cursor: pointer;
    }

    button:hover {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 34px;
    }
    `
  }

  connectedCallback() {
    if (this.shadowRoot == null) throw new Error(SHARED_ERROR_MESSAGE.SHADOW_ROOT_NOT_FOUND)

    this.shadowRoot.innerHTML = /* html */ `
      <style>${ButtonElement.styles}</style>
      <button><slot></slot></button>
    `
  }
}

customElements.define('button-element', ButtonElement)
