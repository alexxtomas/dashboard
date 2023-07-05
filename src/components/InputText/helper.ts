import { SUPPORTED_INPUT_TYPES, SUPPORTED_VALIDATIONS } from './constants.js'
import { SHARED_ERROR_MESSAGE } from '@components/shared/helper.ts'

const { LABEL_REQUIRED, SHADOW_ROOT_NOT_FOUND } = SHARED_ERROR_MESSAGE

export const ERROR_MESSAGE = {
  TYPE_REQUIRED: 'Input type is required',
  TYPE_NOT_SUPPORTED: `Type not supported.\nSupported types: ${SUPPORTED_INPUT_TYPES.join(', ')}.`,
  VALIDATION_NOT_SUPPORTED: `Validation not supported.\nSupported validations: ${SUPPORTED_VALIDATIONS.join(', ')}.`,
  LABEL_REQUIRED,
  SHADOW_ROOT_NOT_FOUND
}
