import type { Metadata } from 'next'
import NavBar from '../components/NavBar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bloglist',
  description: 'A bloglist application built with Next.js'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  )
}
