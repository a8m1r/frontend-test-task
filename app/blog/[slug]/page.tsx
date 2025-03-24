import Image from 'next/image'
import { fetchPostById, fetchAllPostIds } from '@/lib/api'

export async function generateStaticParams() {
  const ids = await fetchAllPostIds()
  return ids.map((id) => ({ slug: id.toString() }))
}

const PostHeader = ({ title, userId }: { title: string; userId: number }) => (
  <header className="mb-6">
    <h1 className="text-3xl font-semibold text-black dark:text-white">
      {title}
    </h1>
    <p className="mt-4 text-gray-500 dark:text-gray-400">
      By User {userId} | {new Date().toLocaleDateString()}
    </p>
  </header>
)

const PostImage = ({ alt }: { alt: string }) => (
  <Image
    src="/placeholder.jpg"
    alt={alt}
    width={800}
    height={400}
    className="mb-4"
    priority={true}
  />
)

const PostContent = ({ body }: { body: string }) => (
  <div className="prose dark:prose-invert text-gray-800 dark:text-gray-100">
    {body}
  </div>
)

export type paramsType = Promise<{ slug: string }>

export default async function BlogPostPage(props: { params: paramsType }) {
  const { slug } = await props.params
  const postId = parseInt(slug, 10)
  const post = await fetchPostById(postId)

  if (!post) {
    return (
      <div className="text-gray-800 dark:text-gray-100">Post not found</div>
    )
  }

  return (
    <article className="mt-8 max-w-none">
      <PostHeader title={post.title} userId={post.userId} />
      <PostImage alt={post.title} />
      <PostContent body={post.body} />
    </article>
  )
}
