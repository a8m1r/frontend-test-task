import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[100%] flex items-center justify-center bg-transparent">
      <div className="text-center p-6 bg-white dark:bg-blue-800 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  )
}
