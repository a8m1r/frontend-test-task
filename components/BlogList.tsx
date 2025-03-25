'use client'

import { useEffect, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import useStore from '@/lib/store'
import { Post } from '@/types'

const LazyBlogCard = dynamic(() => import('./BlogCard'))

export default function BlogList({ initialPosts }: { initialPosts: Post[] }) {
  const { posts, setPosts, searchQuery } = useStore()
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [prevPosts, setPrevPosts] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (posts.length === 0) {
      setPosts(initialPosts)
      setPrevPosts(initialPosts)
    } else if (searchQuery) {
      setPosts(initialPosts)
      setPage(1)
    } else if (!searchQuery && prevPosts.length > 0) {
      setPosts(prevPosts)
    }
  }, [initialPosts, searchQuery, setPosts, posts.length, prevPosts])

  const loadMorePosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const newPosts = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page + 1}&_limit=9${
          searchQuery ? `&q=${searchQuery}` : ''
        }`,
      ).then((res) => res.json())

      const updatedPosts = [...posts, ...newPosts]
      setPosts(updatedPosts)

      if (!searchQuery) {
        setPrevPosts(updatedPosts)
      }
      setPage((prev) => prev + 1)
    } catch (error) {
      setError('Failed to load posts. Please try again later.')
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Suspense
            key={post.id}
            fallback={post.id === 1 ? <p>Loading...</p> : null}
          >
            <LazyBlogCard post={post} />
          </Suspense>
        ))}
      </div>

      {error && (
        <div role="alert" className="mt-4 text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {posts.length === 0 && searchQuery.length > 0 ? (
        <p>No posts found</p>
      ) : null}

      {posts.length > 0 && !searchQuery && (
        <button
          onClick={loadMorePosts}
          disabled={loading}
          className="mt-6 px-4 py-2 bg-blue-500 dark:bg-blue-500 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-600 disabled:opacity-50 transition-colors"
          aria-label="Load more posts"
        >
          {loading ? (
            <span aria-live="assertive">Loading...</span>
          ) : (
            'Load More'
          )}
        </button>
      )}
    </div>
  )
}
