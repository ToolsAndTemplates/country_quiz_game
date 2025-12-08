import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Country Quiz Game - Test Your Geography Knowledge',
  description: 'Challenge yourself with an engaging country quiz game featuring flags, capitals, and more!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
