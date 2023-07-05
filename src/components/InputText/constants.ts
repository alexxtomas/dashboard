import { type Validation } from '@validations/types.ts'

export const SUPPORTED_INPUT_TYPES = ['text', 'email'] as const
export const SUPPORTED_VALIDATIONS: Validation[] = ['email', 'dni', 'name']
