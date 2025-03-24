import './globals.css'
import { Inter } from 'next/font/google'
import ThemeToggle from '@/components/ThemeToggle'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog Platform',
  description: 'A dynamic blog platform built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-white dark:bg-blue-950 text-gray-800 dark:text-gray-100 transition-colors duration-300`}
      >
        <header className="p-4 bg-white dark:bg-blue-900 shadow">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-black dark:text-white"
              aria-label="Go to homepage"
            >
              Blog Platform
            </Link>
            <ThemeToggle />
          </div>
        </header>
        <main className="max-w-5xl mx-auto py-8 px-4">{children}</main>
      </body>
    </html>
  )
}
