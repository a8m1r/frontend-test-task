'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error occurred:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-6 bg-white dark:bg-blue-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          Something went wrong!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {error.message || 'An unexpected error occurred.'}
        </p>
        {error.digest && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
