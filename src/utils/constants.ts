import { $ } from './functions.ts'

export const ROUTES = {
  '/': {
    title: 'Home',
    view: async () => {
      const Home = await import('@views/Home.ts').then((module) => {
        return module.Home()
      })

      return Home
    }
  },
  '/welcome': {
    title: 'Welcome',
    view: async () => {
      const Welcome = await import('@views/Welcome.ts').then((module) => module.Welcome())
      return Welcome
    }
  },
  '/login': {
    title: 'Login',
    view: async () => {
      const Login = await import('@views/Login.ts').then((module) => module.Login())
      return Login
    }
  },
  '/sign-up': {
    title: 'Sign Up',
    view: async () => {
      const SignUp = await import('@views/SignUp.ts').then((module) => module.SignUp())
      return SignUp
    }
  }
} as const

export const $APP = $<HTMLElement>('#app')
