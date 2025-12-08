import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Country Quiz Game - Test Your Geography Knowledge',
  description: 'Challenge yourself with an engaging country quiz game featuring flags, capitals, and more!',
  manifest: '/manifest.json',
  themeColor: '#ee7752',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Country Quiz',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

import PWAInstall from '@/components/PWAInstall'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <PWAInstall />
      </body>
    </html>
  )
}
