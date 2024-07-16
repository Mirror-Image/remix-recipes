import { TFieldErrors } from '~/types/general'
import { Schema } from 'zod'
import { handleValidationError } from './handleValidationError'

export const validateForm = <T>(
  formData: FormData,
  zodSchema: Schema<T>,
  successFn: (data: T) => unknown,
  errorFn: (error: TFieldErrors) => unknown = handleValidationError,
) => {
  const result = zodSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    const errors: TFieldErrors = {}

    result.error.issues.forEach(issue => {
      const path = issue.path.join('.')

      errors[path] = issue.message
    })

    return errorFn(errors)
  }

  return successFn(result.data)
}
