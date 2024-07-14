import classNames from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'delete'
}

export const Button: FC<IButtonProps> = ({ children, className, variant, ...props }) => (
  <button
    {...props}
    className={classNames('flex px-3 py-2 rounded-md justify-center', className, {
      'text-white bg-primary hover:bg-primary-light': variant === 'primary',
      'border-2 border-red-600 text-red-600': variant === 'delete',
      'hover:bg-red-600 hover:text-white': variant === 'delete',
    })}
  >
    {children}
  </button>
)
