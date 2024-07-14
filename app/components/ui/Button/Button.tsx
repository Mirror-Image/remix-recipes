import classNames from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'delete'
  isLoading?: boolean
}

export const Button: FC<IButtonProps> = ({ children, className, isLoading, variant, ...props }) => (
  <button
    {...props}
    className={classNames(
      'flex px-3 py-2 rounded-md justify-center',
      {
        'text-white bg-primary hover:bg-primary-light': variant === 'primary',
        'bg-primary-light': isLoading && variant === 'primary',

        'border-2 border-red-600 text-red-600': variant === 'delete',
        'hover:bg-red-600 hover:text-white': variant === 'delete',
        'border-red-400 text-red-400': isLoading && variant === 'delete',
      },
      className,
    )}
  >
    {children}
  </button>
)
