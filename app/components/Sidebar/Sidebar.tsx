import { SIDEBAR_CONFIG } from './constants'
import { SidebarItem } from './components'

export const Sidebar = () => (
  <nav className='bg-primary text-white'>
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
  </nav>
)
