'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  const updateTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', isDark.toString())
  }

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    const isDark = savedDarkMode === 'true'
    setDarkMode(isDark)
    updateTheme(isDark)
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    updateTheme(newDarkMode)
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-blue-500 dark:bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors cursor-pointer"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  )
}
