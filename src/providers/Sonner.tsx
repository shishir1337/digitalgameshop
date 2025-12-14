'use client'

import { useTheme } from 'next-themes'
import { Toaster } from 'sonner'

export const SonnerProvider = ({ children }: { children?: React.ReactNode }) => {
  const { theme } = useTheme()

  return (
    <>
      {children}

      <Toaster richColors position="bottom-right" theme={(theme as 'light' | 'dark') || 'light'} />
    </>
  )
}
