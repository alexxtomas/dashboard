import * as yup from 'yup'
import type { Validation } from './types.ts'

const emailSchema = yup.string().email('Invalid email')

const passwordSchema = yup
  .string()
  .min(8)
  .max(20)
  .test(
    'password',
    'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    (value) => {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
        value as string
      )
    }
  )

const nameSchema = yup.string().min(3).max(20)

const avatarSchema = yup
  .mixed()
  .test('fileType', 'The file must be an image', (value) => {
    if (!(value instanceof File)) return false
    return value.type === 'image/*'
  })
  .test('fileSize', 'The image is too large', (value) => {
    if (!(value instanceof File)) return false
    return value.size <= 2000000
  })

const dniSchema = yup.string().test('dni', 'Invalid DNI', (value) => {
  if (value == null) return false
  return /^[0-9]{8,8}[A-Za-z]$/.test(value)
})

export const schema: Record<Validation, yup.AnySchema> = {
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  avatar: avatarSchema,
  dni: dniSchema
}
