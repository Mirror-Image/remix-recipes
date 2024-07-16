import { json } from '@remix-run/react'
import { STATUS_CODES_ENUM } from '~/types/general'

export const handleValidationError = <T>(errors: T) =>
  json({ errors }, { status: STATUS_CODES_ENUM.BAD_REQUEST })
