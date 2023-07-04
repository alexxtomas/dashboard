import { validator } from '@validations/index.ts'
import { type Validation } from '@validations/types.ts'

const SUPPORTED_INPUT_TYPES = ['text', 'email'] as const
const SUPPORTED_VALIDATIONS: Validation[] = ['email', 'dni', 'name']

class DashboardInputText extends HTMLElement {
  input: HTMLInputElement | null = null
  validation: Validation | null = null
  inputType: (typeof SUPPORTED_INPUT_TYPES)[number] | null = null

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.validateAttributes()
  }

  validateAttributes() {
    if (!this.hasAttribute('type')) {
      throw new Error('type attribute is required')
    }

    this.validation = this.getAttribute('validation') as Validation
    this.inputType = this.getAttribute(
      'type'
    ) as (typeof SUPPORTED_INPUT_TYPES)[number]

    if (!SUPPORTED_INPUT_TYPES.includes(this.inputType)) {
      throw new Error(
        `Type not supported.\nSupported types: ${SUPPORTED_INPUT_TYPES.join(
          ', '
        )}.`
      )
    }

    if (
      this.validation != null &&
      !SUPPORTED_VALIDATIONS.includes(this.validation)
    ) {
      throw new Error(
        `Validation not supported.\nSupported validations: ${SUPPORTED_VALIDATIONS.join(
          ', '
        )}.`
      )
    }
  }

  static get styles() {
    return /* css */ `
     
      .wraper {
        position: relative;
        margin: 20px; auto;
      }

      input {
        display: block;
        font-family: 'SF UI Text Regular';
        line-height: 2em;
        margin: 0;
        padding: 1px 2px 1px 8px;
        width: 100%;
        font-size: 16px;
        border: 1px solid #2b2f30;
        background-color: #fff;
        border-radius:6px;
        font-weight: 500;
        outline: none;
      }

      label {
        display: block;
        position: absolute;
        opacity: 0;
        bottom: 30px;
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
        z-index: -1;
        transition: 0.2s ease-in-out;
      }

      input:not(:placeholder-shown) + label, input:focus:not(:placeholder-shown) + label {
        visibility: visible;
        z-index: 1;
        opacity: 1;
        transform: translateY(-36px);
        transition: 0.2s ease-in-out transform;
       }

       span {
        font-family: 'SF UI Text Regular';
        font-size: 12px;
        color: rgb(248, 5, 5);
        font-weight: 600;
        line-height: 25px;
        margin-left: 7px;
        letter-spacing: 0.5px;
       }
      `
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
    if (this.shadowRoot == null) throw new Error('Shadow root not found')
    const id = this.getAttribute('id') ?? ''
    const inputType = this.getAttribute('type')
    const name = this.getAttribute('name') ?? id
    const label = this.getAttribute('label') ?? ''
    const maxWidth = this.getAttribute('max-width') ?? '0'

    if (inputType == null) {
      throw new Error('Input type is required')
    }

    this.shadowRoot.innerHTML = /* html */ `
        <style>${DashboardInputText.styles}</style>
        <div class="container">
        <div class="wraper">
          <input type=${inputType} id=${id} name=${name} placeholder=${label} style=${`max-width: ${maxWidth};`} />
         <label for=${id}>${label}</label>
        <span style=${`max-width: ${maxWidth};`}></span>
        </div>
        </div>
      `

    this.input = this.shadowRoot.querySelector('input') as HTMLInputElement
    this.input.addEventListener('focusout', this)
  }
}

customElements.define('dashboard-input-text', DashboardInputText)
