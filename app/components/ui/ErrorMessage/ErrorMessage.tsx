import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

interface IErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string
}

export const ErrorMessage: FC<IErrorMessageProps> = ({ className, ...props }) => (
  <p
    {...props}
    className={classNames('text-red-600 text-xs h-4', className)}
  />
)
