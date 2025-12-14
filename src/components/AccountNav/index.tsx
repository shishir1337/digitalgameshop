'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/providers/Auth'
import { toast } from 'sonner'

type Props = {
  className?: string
}

export const AccountNav: React.FC<Props> = ({ className }) => {
  const pathname = usePathname()
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      router.push('/')
    } catch (error) {
      toast.error('Failed to log out')
    }
  }

  return (
    <div className={clsx(className)}>
      <ul className="flex flex-col gap-2">
        <li>
          <Button asChild variant="link">
            <Link
              href="/account"
              className={clsx('text-primary/50 hover:text-primary/100 hover:no-underline', {
                'text-primary/100': pathname === '/account',
              })}
            >
              Account settings
            </Link>
          </Button>
        </li>

        <li>
          <Button
            asChild
            variant="link"
            className={clsx('text-primary/50 hover:text-primary/100 hover:no-underline', {
              'text-primary/100': pathname === '/orders' || pathname.includes('/orders'),
            })}
          >
            <Link href="/orders">Orders</Link>
          </Button>
        </li>
      </ul>

      <hr className="w-full border-white/5" />

      <Button
        onClick={handleLogout}
        variant="link"
        className="text-primary/50 hover:text-primary/100 hover:no-underline"
      >
        Log out
      </Button>
    </div>
  )
}
