import { ERROR_MESSAGE } from './helper.js'
import './index.ts'

function setAttributes({ element, attributes }: { element: HTMLElement; attributes: Record<string, string> }) {
  Object.keys(attributes).forEach((attribute) => {
    element.setAttribute(attribute, attributes[attribute])
  })
}

describe('DashboardInputText', () => {
  test('should throw an error if type attribute is not provided', () => {
    const element = document.createElement('input-text')

    setAttributes({
      element,
      attributes: {
        maxWidth: '600px',
        id: 'name',
        label: 'Name',
        name: 'name',
        validation: 'email',
        required: ''
      }
    })

    expect(() => {
      document.body.appendChild(element)
    }).toThrow(ERROR_MESSAGE.TYPE_REQUIRED)
  })
  test('should throw an error if label attribute is not provided', () => {
    const element = document.createElement('input-text')

    setAttributes({
      element,
      attributes: {
        maxWidth: '600px',
        id: 'name',
        type: 'text',
        name: 'name',
        validation: 'email',
        required: ''
      }
    })

    expect(() => {
      document.body.appendChild(element)
    }).toThrow(ERROR_MESSAGE.LABEL_REQUIRED)
  })
  test('should throw an error if type attribute is not supported', () => {
    const element = document.createElement('input-text')

    setAttributes({
      element,
      attributes: {
        maxWidth: '600px',
        id: 'name',
        label: 'Name',
        type: 'not_supported_type',
        name: 'name',
        validation: 'email',
        required: ''
      }
    })

    expect(() => {
      document.body.appendChild(element)
    }).toThrow(ERROR_MESSAGE.TYPE_NOT_SUPPORTED)
  })
  test('should render successfully if all attributes are provided ok', () => {
    const element = document.createElement('input-text')

    element.setAttribute('max-width', '600px')
    element.setAttribute('id', 'name')
    element.setAttribute('label', 'Name')
    element.setAttribute('type', 'text')
    element.setAttribute('name', 'name')
    element.setAttribute('validation', 'email')
    element.setAttribute('required', '')
    document.body.appendChild(element)

    expect(element.shadowRoot?.querySelector('input')).not.toBeFalsy()
  })
})
