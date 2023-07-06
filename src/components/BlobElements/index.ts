import { SHARED_ERROR_MESSAGE } from '@components/shared/helper.ts'

class BlobElements extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get styles() {
    return /* css */ `
    .blob-1 {
      z-index: -1;
      position: fixed;
      filter: blur(120px);
      opacity: 0.5;
      background: #c4eafd;
      border-radius: 50%;
      width: 1000px;
      height: 700px;
      top: -300px;
      left: -300px;
      
    }

    .blob-2 {
      z-index: -1;
      filter: blur(100px);
      top: -300px;
      border-radius: 100%;
      position: fixed;
      left: 60%;
      height: 500px;
      width: 40%;
      opacity: 0.5;
      background-color: #f3aa8c;
    } 
    `
  }

  connectedCallback() {
    if (this.shadowRoot == null) throw new Error(SHARED_ERROR_MESSAGE.SHADOW_ROOT_NOT_FOUND)

    this.shadowRoot.innerHTML = /* html */ `
      <style>${BlobElements.styles}</style>
      <div class="blob-1"></div>
      <div class="blob-2"></div>
    `
  }
}

customElements.define('blob-elements', BlobElements)
