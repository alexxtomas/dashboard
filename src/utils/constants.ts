import { Home } from '@views/Home.ts'
import { Login } from '@views/Login.ts'
import { SignUp } from '@views/sign-up.ts'
import { Welcome } from '@views/welcome.ts'
import { $ } from './functions.ts'

export const ROUTES = {
  '/': { title: 'Home', view: Home },
  '/welcome': { title: 'Welcome', view: Welcome },
  '/login': { title: 'Login', view: Login },
  '/sign-up': { title: 'Sign Up', view: SignUp }
} as const

export const $APP = $<HTMLElement>('#app')
