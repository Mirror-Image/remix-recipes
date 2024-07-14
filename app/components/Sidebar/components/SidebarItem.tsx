import { FC, ReactNode } from 'react'
import { NavLink, useNavigation, useResolvedPath } from '@remix-run/react'
import classNames from 'classnames'

interface ISidebarItemProps {
  children: ReactNode
  to: string
}

export const SidebarItem: FC<ISidebarItemProps> = ({ to, children }) => {
  const navigation = useNavigation()
  const path = useResolvedPath(to)

  const isLoading = navigation.state === 'loading' && navigation.location.pathname === path.pathname

  return (
    <li className='w-16'>
      <NavLink to={to}>
        {({ isActive }) => (
          <div
            className={classNames('py-4 flex justify-center hover:bg-primary-light', {
              'bg-primary-light': isActive,
              'animate-pulse bg-primary-light': isLoading,
            })}
          >
            {children}
          </div>
        )}
      </NavLink>
    </li>
  )
}
