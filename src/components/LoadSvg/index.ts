import { ERROR_MESSAGE } from './helper.ts'

class LoadSvg extends HTMLElement {
  src: string | null = null
  size: string | null = null
  strokeWidth: string | null = null
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['src']
  }

  async loadSvg() {
    if (this.shadowRoot == null) throw new Error(ERROR_MESSAGE.SHADOW_ROOT_NOT_FOUND)
    if (this.src == null) throw new Error(ERROR_MESSAGE.SRC_REQUIRED)
    this.shadowRoot.innerHTML = await (await fetch(this.src)).text()
  }

  addSize() {
    if (this.size != null && !isNaN(Number(this.size))) {
      this.shadowRoot?.querySelector('svg')?.setAttribute('style', `width: ${this.size}px; height: ${this.size}px`)
    }
  }

  changeStrokeWidth() {
    if (this.strokeWidth != null && !isNaN(Number(this.strokeWidth))) {
      this.shadowRoot?.querySelector('svg')?.setAttribute('stroke-width', this.strokeWidth)
    }
  }

  async attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === 'src') {
      this.src = newValue
      await this.loadSvg()
      this.addSize()
      this.changeStrokeWidth()
    }
  }

  async connectedCallback() {
    this.size = this.getAttribute('size')
    this.strokeWidth = this.getAttribute('stroke-width')
    this.src = this.getAttribute('src')

    await this.loadSvg()
    this.addSize()
    this.changeStrokeWidth()
  }
}

customElements.define('load-svg', LoadSvg)
