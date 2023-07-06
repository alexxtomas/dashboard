import { SHARED_ERROR_MESSAGE } from '@components/shared/helper.ts'

interface Item {
  icon: string
  title: string
}

class NavigationGuide extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get styles() {
    return /* css */ `
    ul {
      list-style: none;
    }
    li {
      display: flex;
      flex-direction: column;
      gap: 10px;
      position: relative;
    }

    .content-wraper {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    p {
      font-size: 14px;
      max-width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0.25px;
      font-family: 'SF UI Text Regular';
    }

    .divider {
      position: relative;
      right: 4px;
      width: 24px;
      border: 0.9px solid #2b2f30;  
      transform: rotate(90deg);
    }

    .margin-top {
      margin-top: 10px;
    }

    .active {
      font-weight: 600;
    }

    
    `
  }

  /*
    Example of items data:
    items="[{
      icon: '/icons/greeting.svg',
      title: 'General Data',
    }]"

    activeIndex="0"

    completedIndex="1"

     
  */

  connectedCallback() {
    const items = this.getAttribute('items')
    let activeIndex: string | number | null = this.getAttribute('activeIndex')
    let completedIndex: string | number | null = this.getAttribute('completedIndex')
    const completedIcon = this.getAttribute('completedIcon')

    if (this.shadowRoot == null) throw new Error(SHARED_ERROR_MESSAGE.SHADOW_ROOT_NOT_FOUND)
    if (items == null || items === '') throw new Error('items attribute is required')

    const parsedItems = JSON.parse(decodeURIComponent(items))

    if (!Array.isArray(parsedItems)) throw new Error('items attribute must be an array')

    if (parsedItems.length === 0) throw new Error('items attribute must have at least one item')

    if (parsedItems.some((el) => typeof el.icon !== 'string' || typeof el.title !== 'string'))
      throw new Error('items attribute must have icon and title properties and they must be strings')

    if (activeIndex != null) {
      activeIndex = Number(activeIndex)
      if (isNaN(activeIndex)) throw new Error('activeIndex attribute must be a number')
    }

    if (completedIndex != null) {
      completedIndex = Number(completedIndex)
      if (isNaN(completedIndex)) throw new Error('completedIndex attribute must be a number')
      if (completedIcon == null || completedIcon === '')
        throw new Error('completedIcon attribute is required if completedIndex is set')
    }

    this.shadowRoot.innerHTML = /* html */ `
    <style>${NavigationGuide.styles}</style>
    <section>
      <ul class="list">

      ${(parsedItems as Item[])
        .map((item, idx) => {
          const isFirstItem = idx === 0
          const isLastItem = idx === parsedItems.length - 1
          const isCompleted = completedIndex === idx
          const isActive = activeIndex === idx || isCompleted
          return /* html */ `
        <li class="item ${!isFirstItem ? 'margin-top' : ''} margin-top">
        <div class="content-wraper">
        <load-svg src=${isCompleted ? (completedIcon as string) : item.icon} size="16"></load-svg>
        <p class="${isActive ? 'active' : ''}">${item.title}</p>
        </div>
        ${!isLastItem ? '<div class="divider"></div>' : ''}
        </li>
        `
        })
        .join('')}

    
      </ul>
      </section
    `
  }
}

customElements.define('navigation-guide', NavigationGuide)

//  <li class="item">
//      <div class="content-wraper">
//       <load-svg src="/icons/greeting.svg" size="16"></load-svg>
//       <p>General Data</p>
//      </div>
//      <div class="divider"></div>
//      </li>

//      <li class="item margin-top">
//      <div class="content-wraper">
//      <load-svg src="/icons/user.svg" size="16"></load-svg>
//      <p>Profile Type</p>
//      </div>
//      <div class="divider"></div>
//      </li>

//      <li class="item margin-top">
//      <div class="content-wraper">
//      <load-svg src="/icons/business.svg" size="16"></load-svg>
//      <p>Tax Information</p>
//      </div>
//      </li>
