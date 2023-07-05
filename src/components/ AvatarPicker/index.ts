import { SHARED_ERROR_MESSAGE } from '@components/shared/helper.ts'
import '@components/LoadSvg/index.ts'
import { validator } from '@validations/index.ts'

class AvatarPicker extends HTMLElement {
  input: HTMLInputElement | null = null
  label: string = ''
  button: HTMLButtonElement | null = null

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get styles() {
    return /* css */ `
    :host {
      width: max-content;
      display: block;
    }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: max-content;
        gap: 8px;
      }

      label {
        font-family: 'SF UI Text Bold';
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 0.25px;
        color: #2b2f30;
        max-width: 300px;
        text-align: center;
        margin-bottom: 8px;
      }

      .input-wraper {
        position: relative;
         width: 120px;
         height: 120px;
          border-radius: 100%;
          overflow: hidden;
          border: 1px solid #2b2f30;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          filter: drop-shadow(rgba(0, 0, 0, 0.1) 0px 0px 34px);
      }

      input, .default-image-wraper, .delete-image-wraper {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

      input {
        opacity: 0;
        cursor: pointer;
        z-index: 1;
      }

      .default-image-wraper, .delete-image-wraper{
        display:flex;
        align-items: center;
        justify-content: center;
      }

      

      button {
        width:40px; 
        height:40px; 
        outline: none; 
        border: none; 
        background-color: inherit; 
        display: flex; 
        align-items: center; 
        justify-content: center;
        cursor: pointer;
        z-index: 2;
      }

      p {
        font-family: 'SF UI Text Regular';
        font-size: 12px;
        color: rgb(248, 5, 5);
        font-weight: 600;
        line-height: 25px;
        letter-spacing: 0.5px;
        max-width: 300px;
      }

      .display-none {
        display: none;
      }

      .default-cursor {
        cursor: default;
      }
    `
  }

  validateAttributes() {
    const label = this.getAttribute('label')

    if (label == null) throw new Error('label attribute is required')

    this.label = label
  }

  async handleEvent(e: Event) {
    if (e.type === 'change') {
      const _e = e as Event & { target: HTMLInputElement }
      const inputWraper = this.shadowRoot?.querySelector('.input-wraper')
      const input = this.shadowRoot?.querySelector('input')
      const defaultImageWraper = this.shadowRoot?.querySelector('.default-image-wraper')
      const deleteImageWraper = this.shadowRoot?.querySelector('.delete-image-wraper')
      const reader = new FileReader()

      if (_e.target.files != null) {
        const p = this.shadowRoot?.querySelector('p') as HTMLParagraphElement

        const file = _e.target.files[0]

        const { isValid, message } = await validator({
          validation: 'avatar',
          value: file
        })

        if (!isValid) {
          p.textContent = message
          return
        }

        p.textContent = ''

        reader.readAsDataURL(_e.target.files[0])
      }
      reader.addEventListener('load', () => {
        if (inputWraper != null && reader.result != null) {
          inputWraper.setAttribute(
            'style',
            `background-image:linear-gradient(0deg, rgba(196, 234, 253, 0.8), rgba(196, 234, 253, 0.8)), url(${
              reader.result as string
            }); `
          )
          input?.setAttribute('disabled', 'true')
          input?.classList.add('default-cursor')
          defaultImageWraper?.classList.add('display-none')
          deleteImageWraper?.classList.remove('display-none')
        }
      })
    }

    if (e.type === 'click') {
      const input = this.shadowRoot?.querySelector('input')
      const inputWraper = this.shadowRoot?.querySelector('.input-wraper')
      const defaultImageWraper = this.shadowRoot?.querySelector('.default-image-wraper')
      const deleteImageWraper = this.shadowRoot?.querySelector('.delete-image-wraper')
      if (input != null && inputWraper != null && defaultImageWraper != null && deleteImageWraper != null) {
        input.value = ''
        input.removeAttribute('disabled')
        input.classList.remove('default-cursor')
        inputWraper.setAttribute('style', '')
        defaultImageWraper?.classList.remove('display-none')
        deleteImageWraper?.classList.add('display-none')
      }
    }
  }

  connectedCallback() {
    const id = this.getAttribute('id') ?? ''
    const name = this.getAttribute('name') ?? ''
    const defaultImage = this.getAttribute('default-image') ?? '/icons/camera.svg'
    const disabled = this.getAttribute('active') != null ? 'disabled' : ''

    if (this.shadowRoot == null) throw new Error(SHARED_ERROR_MESSAGE.SHADOW_ROOT_NOT_FOUND)

    this.validateAttributes()

    this.shadowRoot.innerHTML = /* html */ `
      <style>${AvatarPicker.styles}</style>
      <div class="container">
        <label>${this.label}</label>
        <div class="input-wraper">
        <input ${disabled}  type="file" accept="image/*" name=${name} id=${id} />
        <div class="default-image-wraper">
        <load-svg src=${defaultImage} size="40" stroke-width="1"></load-svg>
        </div>
        <div class="delete-image-wraper display-none">
        <button style="width:40px; height:40px; cursor: pointer; outline: none; border: none; background-color: inherit; display: flex; align-items: center; justify-content: center;">
        <load-svg src="/icons/trash.svg" size="40" stroke-width="1.2"></load-svg>
        </button>
        </div>
        </div>
        <p></p>
      </div>
    `

    this.input = this.shadowRoot.querySelector('input')
    this.button = this.shadowRoot.querySelector('button')

    this.input?.addEventListener('change', this)
    this.button?.addEventListener('click', this)
  }
}

customElements.define('avatar-picker', AvatarPicker)
