import { SHARED_ERROR_MESSAGE } from '@components/shared/helper.ts'
import { validator } from '@validations/index.ts'
import '@components/LoadSvg/index.ts'

export class InputPassword extends HTMLElement {
  input: HTMLInputElement | null = null
  button: HTMLButtonElement | null = null
  label: string = ''
  loadSvg: HTMLElement | null = null

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get styles() {
    return /* css */ `
      :host {
        width: 100%;
      }
      .wraper {
        position: relative;
        width: 100%;
        padding: 2px 0px 4px 8px;
        border: 1px solid #2b2f30;
        background-color: #fff;
        border-radius:6px;
        display: flex;
        gap: 2px;
        align-items: center;

      }

      input {
        font-family: 'SF UI Text Regular';
        line-height: 2em;
        margin: 6px 0 0 0;
        height: 100%;
        width: 100%;
        font-size: 16px;
        font-weight: 500;
        outline: none;
        border: none;

      }

      label {
        display: block;
        position: absolute;
        opacity: 0;
        top: 0px;
        font-family: 'SF UI Text Bold';
        left: 7px;
        color: #2b2f30;
        transition: 0.2s ease-in-out transform;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.25px;
      }

      input:placeholder-shown + label { 
        visibility: hidden;
        display: inline;
        z-index: -1;
        transition: 0.2s ease-in-out;
      }

      input:not(:placeholder-shown) + label, input:focus:not(:placeholder-shown) + label {
        visibility: visible;
        z-index: 1;
        opacity: 1;
        transform: translateY(-18px);
        transition: 0.2s ease-in-out transform;
       }

       span {
        display: block;
        font-family: 'SF UI Text Regular';
        font-size: 12px;
        color: rgb(248, 5, 5);
        font-weight: 600;
        line-height: 25px;
        padding-left: 7px;
        letter-spacing: 0.5px;
       }
       button {
        height: 25px;
        width: 25px;
        border: none;
        background-color: transparent;
        outline: none;
        cursor: pointer;
        z-index: 1; 
        margin-right: 8px;
       }
      `
  }

  validateAttributes() {
    const label = this.getAttribute('label')

    if (label == null) throw new Error(SHARED_ERROR_MESSAGE.LABEL_REQUIRED)

    this.label = label
  }

  async handleEvent(e: Event) {
    if (e.type === 'focusout') {
      const input = this.shadowRoot?.querySelector('input') as HTMLInputElement
      const span = this.shadowRoot?.querySelector('span') as HTMLSpanElement

      const required = this.getAttribute('required')

      if (required != null && input.value === '') {
        span.textContent = 'Este campo es requerido'
        return
      }

      const { isValid, message } = await validator({
        validation: 'password',
        value: input.value
      })

      if (!isValid) {
        span.textContent = message
        return
      }

      span.textContent = ''
    }

    if (e.type === 'click') {
      const inputType = this.input?.getAttribute('type')
      this.loadSvg = this.loadSvg == null ? (this.shadowRoot?.querySelector('load-svg') as HTMLElement) : this.loadSvg

      if (this.input?.value === '') return
      if (inputType === 'password') {
        this.input?.setAttribute('type', 'text')
        this.button?.setAttribute('aria-label', 'Hidde password')
        this.loadSvg.setAttribute('src', '/icons/eye-slash.svg')
        return
      }

      this.input?.setAttribute('type', 'password')
      this.button?.setAttribute('aria-label', 'Show password')
      this.loadSvg.setAttribute('src', '/icons/eye.svg')
    }

    if (e.type === 'input') {
      this.loadSvg = this.loadSvg == null ? (this.shadowRoot?.querySelector('load-svg') as HTMLElement) : this.loadSvg
      if (this.input?.value === '') {
        this.loadSvg.setAttribute('src', '/icons/eye.svg')
        this.input?.setAttribute('type', 'password')
      }
    }
  }

  connectedCallback() {
    if (this.shadowRoot == null) throw new Error(SHARED_ERROR_MESSAGE.SHADOW_ROOT_NOT_FOUND)
    const id = this.getAttribute('id') ?? ''
    const name = this.getAttribute('name') ?? id
    const maxWidth = this.getAttribute('max-width') ?? '0'

    this.validateAttributes()

    this.shadowRoot.innerHTML = /* html */ `
        <style>${InputPassword.styles}</style>
        <div class="container">
        <div class="wraper">
          <input type='password' id=${id} name=${name} placeholder=${this.label} style=${`max-width: ${maxWidth};`} />
         <label for=${id}>${this.label}</label>
         <button>
         <load-svg src="/icons/eye.svg" size="25"></load-svg>
       </button>
        </div>
        <span style=${`max-width: ${maxWidth};`}></span>

        </div>
      `

    this.input = this.shadowRoot.querySelector('input') as HTMLInputElement
    this.button = this.shadowRoot.querySelector('button') as HTMLButtonElement

    this.input.addEventListener('focusout', this)
    this.input.addEventListener('input', this)
    this.button.addEventListener('click', this)
  }
}

window.customElements.define('input-password', InputPassword)
