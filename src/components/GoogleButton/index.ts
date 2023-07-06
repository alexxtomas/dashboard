import { SHARED_ERROR_MESSAGE } from '@components/shared/helper.ts'
import '@components/LoadSvg/index.ts'

class GoogleButton extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get styles() {
    return /* css */ `

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border-radius: 8px;
      font-family: 'SF UI Text Bold';
      border: 1px solid #2b2f30;
      font-size: 16px;
      padding: 0 40px;
      height: 52px;
      background-color: #ffffff;
      vertical-algin: middle;
      cursor: pointer;
    }

    button:hover {
      box-shadow: 0px 0px 34px rgba(0, 0, 0, 0.1);
    }


    `
  }

  connectedCallback() {
    if (this.shadowRoot == null) throw new Error(SHARED_ERROR_MESSAGE.SHADOW_ROOT_NOT_FOUND)

    const width = this.getAttribute('width')

    this.shadowRoot.innerHTML = /* html */ `
      <style>${GoogleButton.styles}</style>
      <button style="width: ${width != null ? width : 'auto'}">
        <load-svg src="/icons/google.svg" size="32"></load-svg>
        <slot></slot>
      </button>
    `
  }
}

customElements.define('google-button', GoogleButton)
