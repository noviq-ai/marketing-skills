import { IconBook2, IconSparkles } from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <NavLink className="inline-flex items-center gap-2 font-semibold" to="/">
          <IconSparkles size={18} stroke={1.8} />
          <span>Marketing Skills</span>
        </NavLink>
        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                'rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground',
                isActive && 'bg-muted text-foreground',
              )
            }
          >
            Top
          </NavLink>
          <NavLink
            to="/docs"
            className={({ isActive }) =>
              cn(
                'inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground',
                isActive && 'bg-muted text-foreground',
              )
            }
          >
            <IconBook2 size={16} stroke={1.8} />
            Docs
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
