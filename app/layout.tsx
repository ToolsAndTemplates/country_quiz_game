import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Country Quiz Game - Test Your Geography Knowledge',
  description: 'Challenge yourself with an engaging country quiz game featuring flags, capitals, and more!',
  manifest: '/manifest.json',
  themeColor: '#ee7752',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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
