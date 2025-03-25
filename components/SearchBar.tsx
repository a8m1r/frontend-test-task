'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import useStore from '@/lib/store'
import useDebounce from '@/hooks/useDebounce'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setSearchQuery } = useStore()
  const [input, setInput] = useState(() => searchParams.get('q') || '')
  const debouncedInput = useDebounce(input, 200)

  useEffect(() => {
    setSearchQuery(debouncedInput)
    router.push(
      debouncedInput ? `/?q=${encodeURIComponent(debouncedInput)}` : '/',
    )
  }, [debouncedInput, setSearchQuery, router])

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search posts..."
      className="w-full p-2 mb-6 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-blue-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 transition-colors"
      aria-label="Search blog posts"
    />
  )
}
