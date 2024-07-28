import { SIDEBAR_CONFIG } from './constants'
import { SidebarItem } from './components'
import { LoginIcon } from '~/assets/icons'
import classNames from 'classnames'

export const Sidebar = () => (
  <nav
    className={classNames(
    'bg-primary text-white md:w-16',
      'flex justify-between md:flex-col'
    )}
  >
    <ul className='flex md:flex-col'>
      {SIDEBAR_CONFIG.map(({ to, Icon }) => (
        <SidebarItem
          to={to}
          key={to}
        >
          <Icon />
        </SidebarItem>
      ))}
    </ul>
    <ul>
      <SidebarItem to='/login'>
        <LoginIcon />
      </SidebarItem>
    </ul>
  </nav>
)
