import { schema } from './schema.ts'
import type { Validation } from './types.ts'
import { ValidationError } from 'yup'

interface Params {
  validation: Validation
  value: unknown
}

export const VALIDATIONS = [
  'email',
  'password',
  'name',
  'avatar',
  'dni'
] as const

export async function validator({ validation, value }: Params) {
  try {
    await schema[validation].validate(value)
    return {
      isValid: true,
      message: ''
    }
  } catch (err) {
    const message =
      err instanceof ValidationError ? err.message : 'Invalid field'
    return {
      isValid: false,
      message
    }
  }
}
