'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types'

interface BlogCardProps {
  post: Post
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link
      href={`/blog/${post.id}`}
      className="block"
      aria-label={`Read post: ${post.title}`}
    >
      <div
        role="article"
        className="p-4 bg-white dark:bg-blue-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-800 dark:text-gray-100 flex flex-col min-h-[400px]"
      >
        <Image
          src="/placeholder.jpg"
          alt={post.title}
          width={300}
          height={150}
          className="object-cover"
        />

        <div className="mt-5 flex flex-col flex-grow">
          <h2
            className="text-xl font-semibold text-black dark:text-white line-clamp-2"
            aria-label={post.title}
          >
            {post.title}
          </h2>

          <p
            className="text-gray-600 dark:text-gray-300 mt-2"
            aria-label={`Post excerpt: ${post.body}`}
          >
            {post.body}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
