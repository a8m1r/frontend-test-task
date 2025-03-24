import { Post } from '@/types'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
      console.error(`Error fetching data from ${url}: ${res.statusText}`)
      return null
    }

    return res.json()
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error)
    return null
  }
}

export async function fetchPosts(query: string = ''): Promise<Post[]> {
  const url = `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=9${
    query ? `&q=${encodeURIComponent(query)}` : ''
  }`
  const res = await fetch(url, { cache: 'no-store' })
  return res.json()
}

export async function fetchPostById(id: number): Promise<Post | null> {
  const url = `${BASE_URL}/${id}`
  return await fetchData<Post>(url)
}

export async function fetchAllPostIds(): Promise<number[]> {
  const posts = await fetchData<Post[]>(BASE_URL)
  return posts ? posts.map((post) => post.id) : []
}
