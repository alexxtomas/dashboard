import { validator } from '@validations/index.ts'
import { type Validation } from '@validations/types.ts'
import { SUPPORTED_INPUT_TYPES, SUPPORTED_VALIDATIONS } from './constants.js'
import { ERROR_MESSAGE } from './helper.js'

export class InputText extends HTMLElement {
  input: HTMLInputElement | null = null
  validation: Validation | null = null
  inputType: (typeof SUPPORTED_INPUT_TYPES)[number] = 'text'
  label: string = ''

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get styles() {
    return /* css */ `
    :host {
      width: 100%;
      display: block;

    }
    .wraper {
      position: relative;
      width: 100%;
    }

    input {
      font-family: 'SF UI Text Regular';
      line-height: 22px;
      width: 96.9%;
      padding-left: 8px;
      height: 50px;
      font-size: 16px;
      border: 1px solid #2b2f30;
      background-color: #fff;
      border-radius:6px;
      font-weight: 300;
      outline: none;
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
      font-size: 13px;
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
      transform: translateY(-20px);
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
      margin-bottom: 16px;
     }
      `
  }

  validateAttributes() {
    const inputType = this.getAttribute('type')
    const validation = this.getAttribute('validation')
    const label = this.getAttribute('label')

    if (inputType == null) {
      throw new Error(ERROR_MESSAGE.TYPE_REQUIRED)
    }

    if (label == null) throw new Error(ERROR_MESSAGE.LABEL_REQUIRED)

    if (!SUPPORTED_INPUT_TYPES.includes(inputType as (typeof SUPPORTED_INPUT_TYPES)[number])) {
      throw new Error(ERROR_MESSAGE.TYPE_NOT_SUPPORTED)
    }

    if (validation != null && !SUPPORTED_VALIDATIONS.includes(validation as Validation)) {
      throw new Error(ERROR_MESSAGE.VALIDATION_NOT_SUPPORTED)
    }

    this.validation = validation as Validation
    this.inputType = inputType as (typeof SUPPORTED_INPUT_TYPES)[number]
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

      if (this.validation == null) return

      const { isValid, message } = await validator({
        validation: this.validation,
        value: input.value
      })

      if (!isValid) {
        span.textContent = message
        return
      }

      span.textContent = ''
    }
  }

  connectedCallback() {
    if (this.shadowRoot == null) throw new Error(ERROR_MESSAGE.SHADOW_ROOT_NOT_FOUND)
    const id = this.getAttribute('id') ?? ''
    const name = this.getAttribute('name') ?? id
    const maxWidth = this.getAttribute('max-width') ?? '0'

    this.validateAttributes()

    this.shadowRoot.innerHTML = /* html */ `
        <style>${InputText.styles}</style>
        <div class="wraper">
          <input type=${this.inputType} id=${id} name=${name} placeholder=${
      this.label
    } style=${`max-width: ${maxWidth};`} />
         <label for=${id}>${this.label}</label>
        <span style=${`max-width: ${maxWidth};`}></span>
        </div>
      `

    this.input = this.shadowRoot.querySelector('input') as HTMLInputElement
    this.input.addEventListener('focusout', this)
  }
}

window.customElements.define('input-text', InputText)
