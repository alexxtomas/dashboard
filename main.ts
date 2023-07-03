import './style.css'
import './src/components'

document.querySelector('#error')?.addEventListener('click', () => {
  const input = document.querySelector('dashboard-input')

  input!.innerHTML = `<span slot="validation-error">Error</span>`
})
