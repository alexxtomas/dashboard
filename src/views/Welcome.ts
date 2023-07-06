import '@components/DashboardForm.ts'
import '@components/DashboardLayout.ts'
import '@components/GoogleButton/index.ts'
import '@components/InputText/index.ts'
import '@components/ButtonElement/index.ts'
import './Welcome.css'

export function Welcome() {
  return /* html */ `
  <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; min-width: 100vw; flex-direction: column;">
    <form>
      <h2>Access your Dashboard in seconds ✨</h2>
      <google-button width="100%">Continuar con Google</google-button>
      <p>or</p>
       <div class="email-input-wraper">
        <input-text  id="welcome-email" label="Your Email" type="text" name="welcome-email" validation="email"></input-text>
        <button-element>Continue</button-element>
       </div>
    </form>
  </div>
  `
}
