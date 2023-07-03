import '@components/DashboardForm.ts'
export function Welcome() {
  return /* html */ `
    <h1>Welcome</h1>
    <dashboard-form onclick="this.test()" is-authenticated="true"></dashboard-form>
  `
}
