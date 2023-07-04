import { schema } from './schema.ts'
import type { Validation } from './types.ts'

interface Params {
  validation: Validation
  value: unknown
}

export async function validator({ validation, value }: Params) {
  return await schema[validation].validate(value)
}
