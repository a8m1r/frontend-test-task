import { Suspense } from 'react'
import BlogList from '@/components/BlogList'
import SearchBar from '@/components/SearchBar'
import { fetchPosts } from '@/lib/api'

export type SearchParamsType = Promise<{ q?: string }>

export default async function Home(props: { searchParams: SearchParamsType }) {
  const searchParams = await props.searchParams
  const query = searchParams.q || ''
  const initialPosts = await fetchPosts(query)

  return (
    <div>
      <SearchBar />
      <Suspense fallback={<p>Loading posts...</p>}>
        <BlogList initialPosts={initialPosts} />
      </Suspense>
    </div>
  )
}
